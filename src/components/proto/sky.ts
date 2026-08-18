import * as THREE from "three";

/**
 * Daylight sky, as two canvas textures.
 *
 * Both scenes that happen outdoors (/home5, /home8) need a sky that reads as
 * a real one at the horizon, and a flat clear colour does not: the tell is
 * that the band just above the stand stays as saturated as the zenith. The
 * gradient below is sampled off the client's own stadium photograph — deep
 * cerulean at the top falling to a pale, slightly warm haze at the horizon.
 *
 * These allocate a canvas, so they must only ever be called from the client.
 */

export function skyTexture(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 4;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createLinearGradient(0, 0, 0, 256);
  gradient.addColorStop(0, "#2f6ea8");
  gradient.addColorStop(0.34, "#5b9ad0");
  gradient.addColorStop(0.62, "#95c3e4");
  gradient.addColorStop(0.85, "#cfe1ee");
  gradient.addColorStop(1, "#e7edf1");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 4, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * A single soft cumulus blob, alpha-mapped.
 *
 * Drawn as overlapping radial gradients rather than one circle — a cloud with
 * a single centre of density reads as a smudge, and three or four lobes is the
 * cheapest thing that reads as weather.
 */
export function cloudTexture(): THREE.Texture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const lobes = [
    { x: 0.34, y: 0.58, r: 0.24 },
    { x: 0.52, y: 0.46, r: 0.3 },
    { x: 0.68, y: 0.58, r: 0.22 },
    { x: 0.46, y: 0.64, r: 0.26 },
  ];

  for (const lobe of lobes) {
    const gradient = ctx.createRadialGradient(
      lobe.x * size,
      lobe.y * size,
      0,
      lobe.x * size,
      lobe.y * size,
      lobe.r * size,
    );
    gradient.addColorStop(0, "rgba(255,255,255,0.95)");
    gradient.addColorStop(0.55, "rgba(255,255,255,0.55)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Deterministic scatter, so the cloud field is the same on every load. */
export function cloudField(count: number, radius: number, height: number) {
  return Array.from({ length: count }, (_, i) => {
    // Golden-angle spacing keeps them from clumping without a random seed.
    const theta = i * 2.399963;
    const spread = 0.45 + ((i * 37) % 55) / 100;
    return {
      position: [
        Math.cos(theta) * radius * spread,
        height + ((i * 23) % 40),
        Math.sin(theta) * radius * spread,
      ] as [number, number, number],
      scale: 60 + ((i * 53) % 70),
    };
  });
}
