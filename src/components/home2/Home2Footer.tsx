"use client";

import Link from "next/link";
import Image from "next/image";
import { company } from "@/content/company";

export function Home2Footer() {
  return (
    <footer className="w-full bg-[#f8f9fa] pt-24 pb-12 border-t border-steel-200">
      <div className="w-full px-6 md:px-12 xl:px-24 mx-auto max-w-[1920px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Logo & Info */}
          <div className="md:col-span-4">
            <Link href="/home2" className="flex items-center mb-8" aria-label="Raja Enterprises Home">
              <Image src="/media/brand/raja-logo.png" alt="Raja Enterprises Logo" width={140} height={80} className="h-16 w-auto" />
            </Link>
            <address className="not-italic text-sm text-steel-600 space-y-2 mb-6">
              <p className="font-bold text-ink">“Venkat” #145, 5th Main Road,</p>
              <p>Bengaluru - 18, Karnataka-560018, India</p>
              <p>Ph : 080 26609751/53, 26602958/62</p>
              <p>Fax : 080 26609753</p>
              <p>mobile : +91 98450 44177</p>
              <p>e-mail : raju_rajaenterprises@yahoo.co.in</p>
            </address>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-steel-400 mb-6">Systems</h4>
              <ul className="space-y-4 text-sm font-medium text-ink">
                <li><Link href="#alumall" className="hover:text-brand transition-colors">ALUMALL Systems</Link></li>
                <li><Link href="#german-hangers" className="hover:text-brand transition-colors">German Hangers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-steel-400 mb-6">Expertise</h4>
              <ul className="space-y-4 text-sm font-medium text-ink">
                <li><Link href="#mega-exhibitions" className="hover:text-brand transition-colors">Exhibitions</Link></li>
                <li><Link href="#government" className="hover:text-brand transition-colors">Government PRGs</Link></li>
                <li><Link href="#corporate" className="hover:text-brand transition-colors">Corporate Events</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-steel-400 mb-6">Company</h4>
              <ul className="space-y-4 text-sm font-medium text-ink">
                <li><Link href="#careers" className="hover:text-brand transition-colors">Careers</Link></li>
                <li><Link href="#privacy" className="hover:text-brand transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="md:col-span-3 md:text-right flex flex-col md:items-end justify-between">
            <h3 className="text-2xl font-medium text-ink mb-6">
              Got a project<br/>in mind?
            </h3>
            <Link href="#contact" className="text-brand text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all">
              Let's Talk <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-steel-200 pt-8 text-xs text-steel-400 font-medium tracking-wide">
          <p>&copy; {new Date().getFullYear()} RAJA ENTERPRISES</p>
        </div>
      </div>
    </footer>
  );
}
