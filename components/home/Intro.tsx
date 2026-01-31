'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export function Intro({ onComplete }: { onComplete: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const reelRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null); // New ref for the wrapper
    const svgRef = useRef<SVGPathElement>(null);

    const words = [
        "Hello",           // English
        "नमस्ते",          // Hindi
        "નમસ્તે",          // Gujarati
        "नमस्कार",        // Marathi
        "வணக்கம்",      // Tamil
        "నమస్కారం",      // Telugu
        "নমস্কার"          // Bengali
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    onComplete();
                },
            });

            const curved = "M0 0 L100 0 L100 50 Q50 100 0 50 Z";
            const topFlat = "M0 0 L100 0 L100 0 Q50 0 0 0 Z";

            const stepDuration = 0.25;
            const pauseDuration = 0.15;

            // Animate Reel
            words.forEach((_, i) => {
                if (i === 0) return;

                tl.to(reelRef.current, {
                    yPercent: -(i * 100 / words.length),
                    duration: stepDuration,
                    ease: "back.out(1.2)",
                })
                    .to({}, { duration: pauseDuration });
            });

            tl.to({}, { duration: 0.3 }); // Linger last word

            // Exit Logic: Fade out text AND structure
            tl.to(textContainerRef.current, {
                y: -100,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            }, "exit"); // Label 'exit'

            // Curtain Reveal Sync
            tl.to(svgRef.current, {
                attr: { d: curved },
                duration: 0.8,
                ease: "power2.in"
            }, "exit-=0.1")
                .to(svgRef.current, {
                    attr: { d: topFlat },
                    duration: 0.8,
                    ease: "power2.out"
                }, ">-0.1");

        }, containerRef);

        return () => ctx.revert();
    }, [words.length]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[999] flex items-center justify-center pointer-events-none bg-transparent"
        >
            <svg className="absolute inset-0 w-full h-[120%] -top-[20%] z-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path
                    ref={svgRef}
                    d="M0 0 L100 0 L100 100 Q50 100 0 100 Z"
                    className="fill-gray-400"
                />
            </svg>

            {/* Wrapper to animate everything out together */}
            <div ref={textContainerRef} className="relative z-10 flex items-center gap-6 md:gap-8 origin-bottom">
                <div className="w-[2px] h-12 md:h-20 bg-black/30 rounded-full" />

                <div className="h-[60px] md:h-[100px] overflow-hidden relative">
                    <div ref={reelRef} className="flex flex-col">
                        {words.map((word) => (
                            <div
                                key={word}
                                className="h-[60px] md:h-[100px] flex items-center"
                            >
                                <span className="text-5xl md:text-8xl font-sans font-light tracking-tight text-black whitespace-nowrap">
                                    {word}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
