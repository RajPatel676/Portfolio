'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface WorkItem {
    id: number;
    title: string;
    subtitle: string;
    image: string;
}

export function GsapHoverSlider({ items }: { items: WorkItem[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial State: Show first image
            gsap.set(imageRefs.current[0], { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", opacity: 1, scale: 1 });

            // Hide others
            items.forEach((_, i) => {
                if (i !== 0) {
                    gsap.set(imageRefs.current[i], { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 0, scale: 1.1 });
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, [items]);

    const handleMouseEnter = (index: number) => {
        if (index === activeIndex) return;

        const prevIndex = activeIndex;
        setActiveIndex(index);

        const currentImg = imageRefs.current[index];
        const prevImg = imageRefs.current[prevIndex];

        if (!currentImg || !prevImg) return;

        // Animate Image Transition
        // 1. Reveal New Image (Clip Path up)
        gsap.fromTo(currentImg,
            { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 1, scale: 1.1 },
            { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", opacity: 1, scale: 1, duration: 0.6, ease: "power3.inOut" }
        );

        // 2. Hide Old Image
        gsap.to(prevImg, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            opacity: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.inOut"
        });
    };

    return (
        <div ref={containerRef} className="flex flex-col md:flex-row gap-10 md:gap-20 h-auto md:h-[60vh] w-full">
            {/* Left Column: List */}
            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-8 md:space-y-12">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className="group relative cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(index)}
                    >
                        <h3 className={cn(
                            "text-3xl md:text-5xl font-bold transition-colors duration-300",
                            activeIndex === index ? "text-white" : "text-gray-600 group-hover:text-gray-400"
                        )}>
                            {item.title}
                        </h3>
                        <p className={cn(
                            "text-sm md:text-base mt-2 transition-all duration-300",
                            activeIndex === index ? "text-gray-400 opacity-100 translate-y-0" : "text-gray-600 opacity-0 -translate-y-2"
                        )}>
                            {item.subtitle}
                        </p>
                    </div>
                ))}
            </div>

            {/* Right Column: Images */}
            <div className="w-full md:w-1/2 relative h-[300px] md:h-full overflow-hidden rounded-lg">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        ref={el => { imageRefs.current[index] = el }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                ))}
            </div>
        </div>
    );
}
