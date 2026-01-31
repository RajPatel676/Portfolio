'use client';

import { useRef } from 'react';
import { GsapHoverSlider } from '@/components/ui/gsap-hover-slider';

export function Work() {
    const containerRef = useRef<HTMLDivElement>(null);

    const workCategories = [
        {
            id: 1,
            title: "Web Engineering",
            subtitle: "Scalable React & Next.js Architectures",
            // Abstract geometric code connection
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Generative AI",
            subtitle: "LLM Agents & Neural Interfaces",
            // Abstract neural nodes
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Decentralized Web",
            subtitle: "Smart Contracts & DeFi Protocols",
            // Abstract block chain structure
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop"
        }
    ];

    return (
        <section ref={containerRef} id="work" className="py-24 md:py-32 px-6 md:px-20 bg-background text-foreground relative z-10">
            <div className="max-w-[90vw] md:max-w-6xl mx-auto">
                <div className="mb-16 md:mb-24">
                    <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-500 mb-6">Expertise</h2>
                    <div className="h-[1px] w-full bg-white/10" />
                </div>

                <GsapHoverSlider items={workCategories} />
            </div>
        </section>
    );
}
