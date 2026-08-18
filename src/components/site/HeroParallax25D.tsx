"use client";

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Scene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  
  // Load the exact stadium photograph
  const texture = useTexture('/media/raja/hero-vidhana-soudha.jpg');
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  
  const { viewport } = useThree();

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uTime: { value: 0 },
  }), [texture]);

  useFrame((state) => {
    if (!matRef.current || !meshRef.current) return;
    
    // Smooth mouse interpolation (normalized from -1 to 1)
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;
    
    matRef.current.uniforms.uMouse.value.x = THREE.MathUtils.lerp(matRef.current.uniforms.uMouse.value.x, mouseX, 0.05);
    matRef.current.uniforms.uMouse.value.y = THREE.MathUtils.lerp(matRef.current.uniforms.uMouse.value.y, mouseY, 0.05);
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    
    // Subtle idle breathing for the camera/mesh (cinematic)
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = Math.sin(t * 0.4) * 0.02;
    meshRef.current.position.x = Math.cos(t * 0.3) * 0.01;
    
    // Extremely subtle tilt (user requested max 3-5 degrees, which is ~0.05-0.08 rad)
    // We scale by pointer to keep it responsive but tight
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouseX * 0.06, 0.05);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouseY * 0.04, 0.05);
  });

  // Calculate scaling to ensure the image covers the viewport without stretching
  // Original image aspect is roughly 5808 / 3872 = 1.5
  const imageAspect = 1.5; 
  const viewportAspect = viewport.width / viewport.height;
  
  let scaleX = 1;
  let scaleY = 1;
  
  // We over-scale slightly (1.1x) to give room for the parallax movement without exposing edges
  if (viewportAspect > imageAspect) {
    scaleX = viewport.width * 1.1;
    scaleY = (viewport.width / imageAspect) * 1.1;
  } else {
    scaleX = (viewport.height * imageAspect) * 1.1;
    scaleY = viewport.height * 1.1;
  }

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[scaleX, scaleY, 128, 128]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          precision highp float;
          varying vec2 vUv;
          uniform sampler2D uTexture;
          uniform vec2 uMouse;

          void main() {
            vec2 uv = vUv;
            
            // Sample base color to use luminance as a segmentation heuristic
            vec4 baseCol = texture2D(uTexture, uv);
            float luma = dot(baseCol.rgb, vec3(0.299, 0.587, 0.114));
            
            // In WebGL, uv.y goes from 0 (bottom) to 1 (top)
            float yy = 1.0 - uv.y; 
            
            // Base depth gradient
            float depth = 0.2 + yy * 0.8;
            
            // Heuristic segmentation based on structural regions of the stadium
            if (yy < 0.4) {
                // Top sky/trusses region
                if (luma > 0.6) {
                    depth = 0.2; // Sky is furthest
                } else {
                    depth = 0.45; // Dark trusses pop forward slightly
                }
            } else if (yy >= 0.4 && yy < 0.8) {
                // Middle hanger region
                if (luma > 0.65) {
                    depth = 0.75; // Bright white hanger pops forward
                } else if (luma < 0.3) {
                    depth = 0.9; // Dark equipment sits in front of hanger
                } else {
                    depth = 0.6; // Mid-ground stadium structure
                }
            } else {
                // Bottom seating and floor region
                depth = 1.0 + (yy - 0.8) * 2.0; // Foreground ramps up to 1.4
            }
            
            // Apply depth-based parallax displacement
            vec2 parallax = uMouse * depth * 0.025; 
            
            // Sample final displaced color
            vec4 col = texture2D(uTexture, uv - parallax);
            
            // Subtle environmental depth (soft atmospheric scattering/fog in the rear)
            float fogAmount = (1.0 - depth) * 0.08; // Only affects far objects (depth < 1)
            vec3 skyColor = vec3(0.55, 0.65, 0.75); // Neutral atmospheric blue
            col.rgb = mix(col.rgb, skyColor, max(0.0, fogAmount));
            
            // Very subtle shadow contrast boost
            col.rgb = mix(col.rgb, col.rgb * col.rgb, 0.1);

            gl_FragColor = col;
          }
        `}
      />
    </mesh>
  );
}

export function HeroParallax25D() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-[#dfe7ee]">
      <Suspense fallback={<div className="absolute inset-0 bg-[#dfe7ee]" />}>
        {/* dpr limits device pixel ratio to 2 for performance on high-res screens */}
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}