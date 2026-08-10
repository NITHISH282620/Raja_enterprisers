"use client";

import Link from "next/link";
import { AssetStage } from "@/components/three/AssetStage";
import { categories } from "@/content/inventory";

import Image from "next/image";

export function Home2Inventory() {
  return (
    <section id="capabilities" className="w-full bg-white py-24 border-t border-steel-100">
      <div className="w-full px-6 md:px-12 xl:px-24 mx-auto max-w-[1920px]">
        
        {/* Header Section */}
        <div className="mb-16 max-w-4xl mx-auto text-center">
          <h2 className="text-[2.5rem] font-medium tracking-tight text-ink mb-6">
            Precision Execution at Scale.
          </h2>
          <p className="text-steel-600 text-lg">
            Experts in organizing government programs, trade fairs, exhibitions, conferences, roadshows, and business forums across India. Our approach treats every project with architectural rigor.
          </p>
        </div>

        {/* 4-Card Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Hangers & Structures (Large) */}
          <div className="lg:col-span-8 bg-[#f5f6f8] rounded-[2rem] p-8 md:p-12 relative overflow-hidden group min-h-[450px] flex flex-col justify-end">
            <div className="absolute inset-x-8 top-8 bottom-48">
              {/* Replace 3D with 2D stitch export */}
              <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-105">
                <Image 
                  src="/media/projects/stitch-hanger.png" 
                  alt="Imported German Hangers" 
                  fill 
                  className="object-contain object-bottom"
                />
              </div>
            </div>
            
            <div className="relative z-10 mt-auto">
              <div className="text-[#0a66c2] text-[10px] font-bold tracking-widest uppercase mb-3">
                01 // INFRASTRUCTURE
              </div>
              <h3 className="text-2xl font-medium text-ink mb-3 group-hover:text-[#0a66c2] transition-colors">
                Imported German Hangers & Structures
              </h3>
              <p className="text-steel-600 text-sm max-w-md">
                Our extensive inventory forms the backbone of the most prestigious events. Precision engineered for stability and scale, providing a blank canvas for luxury experiences.
              </p>
            </div>
          </div>

          {/* Card 2: Technical Solutions (Tall) */}
          <div className="lg:col-span-4 bg-[#f5f6f8] rounded-[2rem] p-8 md:p-10 relative overflow-hidden group min-h-[450px] flex flex-col">
            <div className="text-[#0a66c2] text-[10px] font-bold tracking-widest uppercase mb-3">
              ARCHITECTURE
            </div>
            <h3 className="text-2xl font-medium text-ink mb-8 group-hover:text-[#0a66c2] transition-colors">
              Technical Solutions
            </h3>
            
            <div className="relative flex-grow min-h-[200px] mb-8">
              {/* Replace 3D with 2D stitch export */}
              <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-105">
                <Image 
                  src="/media/projects/stitch-technical.png" 
                  alt="Technical Solutions" 
                  fill 
                  className="object-contain object-center"
                />
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-steel-200 pt-6">
              <span className="text-[#0a66c2] text-[9px] font-bold tracking-widest uppercase">WOODEN FLOOR PLATFORMS</span>
              <span className="text-steel-400 text-xs lowercase">arrow_forward</span>
            </div>
            <div className="flex items-center justify-between border-t border-steel-200 pt-4 mt-4">
              <span className="text-[#0a66c2] text-[9px] font-bold tracking-widest uppercase">LED PANELS</span>
              <span className="text-steel-400 text-xs lowercase">arrow_forward</span>
            </div>
          </div>

          {/* Card 3: In-House Workforce (Minimal, text-only as per instructions) */}
          <div className="lg:col-span-6 bg-[#f5f6f8] rounded-[2rem] p-8 md:p-10 flex flex-col justify-between min-h-[350px]">
            <div>
              <div className="text-[#0a66c2] text-[10px] font-bold tracking-widest uppercase mb-3">
                GROUPS
              </div>
              <h3 className="text-2xl font-medium text-ink">
                In-House Workforce
              </h3>
            </div>
            
            <ul className="space-y-4 mt-8">
              <li className="flex items-center gap-3 text-steel-600 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0a66c2]" /> Corporate Events
              </li>
              <li className="flex items-center gap-3 text-steel-600 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0a66c2]" /> Exhibitions & Trade Shows
              </li>
              <li className="flex items-center gap-3 text-steel-600 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0a66c2]" /> Stall Fabrication
              </li>
            </ul>
          </div>

          {/* Card 4: Lighting & AV (Wide) */}
          <div className="lg:col-span-6 bg-[#f5f6f8] rounded-[2rem] p-8 md:p-10 relative overflow-hidden group min-h-[350px] flex">
            <div className="relative z-10 w-1/2 flex flex-col justify-center">
              <div className="text-[#0a66c2] text-[10px] font-bold tracking-widest uppercase mb-3">
                02 // CAPABILITIES
              </div>
              <h3 className="text-2xl font-medium text-ink mb-4 group-hover:text-[#0a66c2] transition-colors">
                Lighting & AV Solutions
              </h3>
              <p className="text-steel-600 text-sm mb-8">
                State-of-the-art audiovisual setups designed to command attention and deliver clear communication in environments of any scale.
              </p>
              <Link href="/work" className="text-[#0a66c2] text-xs font-medium flex items-center gap-2 hover:gap-3 transition-all">
                View Inventory Details <span className="text-steel-400 font-normal lowercase tracking-normal">arrow_forward</span>
              </Link>
            </div>

            <div className="absolute right-0 bottom-0 top-0 w-[55%]">
              {/* Replace 3D with 2D stitch export */}
              <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-105 translate-y-4">
                <Image 
                  src="/media/projects/stitch-lighting.png" 
                  alt="Lighting and AV Solutions" 
                  fill 
                  className="object-contain object-bottom right-[-5%]"
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
