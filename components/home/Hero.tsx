'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function Hero({ isReady = true }: { isReady?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);

    const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);

    const sentence = [
        { text: "I", interactive: false },
        { text: "turn", interactive: false },
        { text: "ideas", interactive: true },
        { text: "into", interactive: false },
        { text: "scalable", interactive: false },
        { text: "digital", interactive: false },
        { text: "products", interactive: true },
        { text: "using", interactive: false },
        { text: "Web,", interactive: true, clean: "Web" },
        { text: "AI,", interactive: true, clean: "AI" },
        { text: "and", interactive: false },
        { text: "Web3.", interactive: true, clean: "Web3" },
    ];

    const wordRefs = useRef<{ [key: number]: HTMLSpanElement | null }>({});
    const bgRefs = useRef<{ [key: number]: HTMLSpanElement | null }>({});
    const lineRefs = useRef<{ [key: number]: HTMLSpanElement | null }>({});

    const handleMouseEnter = (index: number, word: string, isInteractive: boolean) => {
        if (isInteractive) {
            setActiveWordIndex(index);

            const el = wordRefs.current[index];
            const bg = bgRefs.current[index];
            const line = lineRefs.current[index];
            if (!el || !bg || !line) return;

            gsap.killTweensOf([el, bg, line]);

            // 1. Text Animation (Clean Charset, Smooth Ease)
            const duration = 0.5;
            const scrambleObj = { value: 0 };
            const originalText = word;
            const length = originalText.length;

            gsap.to(scrambleObj, {
                value: 1,
                duration: duration,
                ease: "expo.out",
                onUpdate: () => {
                    const progress = scrambleObj.value;
                    const revealIndices = Math.floor(progress * length);
                    let result = "";
                    for (let i = 0; i < length; i++) {
                        if (i < revealIndices) {
                            result += originalText[i];
                        } else {
                            result += CHARS[Math.floor(Math.random() * CHARS.length)];
                        }
                    }
                    el.innerText = result;
                },
                onComplete: () => {
                    el.innerText = originalText;
                }
            });

            // 2. 3D Pill Reveal (Rich Material Expansion)
            gsap.to(bg, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "expo.out"
            });

            // 3. Underline Hide
            gsap.to(line, {
                opacity: 0,
                scaleX: 0.5,
                duration: 0.2
            });

            // 4. Word Lift
            gsap.to(el, {
                y: -4,
                scale: 1.1,
                color: "#ffffff",
                duration: 0.5,
                ease: "expo.out"
            });
        }
    };

    const handleMouseLeave = (index: number, word: string, isInteractive: boolean) => {
        if (isInteractive) {
            setActiveWordIndex(null);

            const el = wordRefs.current[index];
            const bg = bgRefs.current[index];
            const line = lineRefs.current[index];
            if (!el || !bg || !line) return;

            gsap.killTweensOf([el, bg, line]);

            el.innerText = word;

            // Hide Pill
            gsap.to(bg, {
                scale: 0.8,
                opacity: 0,
                duration: 0.4,
                ease: "power3.out"
            });

            // Restore Underline
            gsap.to(line, {
                opacity: 1,
                scaleX: 1,
                duration: 0.4,
                delay: 0.1,
                ease: "power3.out"
            });

            // Restore Word
            gsap.to(el, {
                y: 0,
                scale: 1,
                color: "",
                clearProps: "color,transform,scale",
                duration: 0.4,
                ease: "power3.out"
            });
        }
    };

    useEffect(() => {
        if (!isReady) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.1 });
            tl.fromTo(".word",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, stagger: 0.08, ease: "power4.out" }
            );

            // Subtext animation
            gsap.fromTo(".hero-sub",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, delay: 0.8, ease: "power3.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, [isReady]);

    return (
        <section
            ref={containerRef}
            className="min-h-[100dvh] flex flex-col justify-center items-center px-6 md:px-20 py-24 md:py-32 relative overflow-hidden text-center"
        >
            <div className="max-w-[90vw] md:max-w-6xl flex flex-col items-center">
                <h1 className="text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[1.2] font-bold tracking-tight text-white group/sentence cursor-default select-none transition-colors duration-300 text-center">
                    {sentence.map((item, i) => {
                        const isThisActive = i === activeWordIndex;
                        const isAnyActive = activeWordIndex !== null;

                        return (
                            <span
                                key={i}
                                className={cn(
                                    "relative inline-block mr-[0.25em]",
                                    "transition-[opacity,filter] duration-500 ease-out",

                                    // LOGIC 2: General Hover
                                    !isAnyActive && !item.interactive && "group-hover/sentence:opacity-40 group-hover/sentence:blur-[1px]",
                                    !isAnyActive && item.interactive && "group-hover/sentence:opacity-100 group-hover/sentence:scale-[1.02]",

                                    // LOGIC 1: Specific Word Active
                                    isAnyActive && !isThisActive && "opacity-30 blur-[1px] scale-95",
                                    isThisActive && "z-10"
                                )}
                                onMouseEnter={() => handleMouseEnter(i, item.text, item.interactive)}
                                onMouseLeave={() => handleMouseLeave(i, item.text, item.interactive)}
                                style={{ cursor: item.interactive ? 'pointer' : 'default' }}
                            >
                                {/* 
                  Refined 3D Pill Background 
                  - Gradient: from-violet-950 via-indigo-950 to-blue-950 (Holographic Dark)
                  - Shadows: Deep drop shadow + Subtle inner white gloss
                */}
                                {item.interactive && (
                                    <span
                                        ref={el => { bgRefs.current[i] = el }}
                                        className={cn(
                                            "absolute inset-0 -m-1 md:-mx-4 md:-my-2 rounded-full opacity-0 origin-center pointer-events-none",
                                            "bg-gradient-to-br from-violet-950 via-indigo-950 to-blue-950",
                                            "border border-white/10 ring-1 ring-white/10",
                                            "shadow-[0_15px_30px_-5px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2),0_0_30px_-10px_rgba(139,92,246,0.3)]"
                                        )}
                                        style={{ zIndex: -1, transform: 'scale(0.8) perspective(500px) rotateX(10deg)' }}
                                    />
                                )}

                                {/* Persistent Underline */}
                                {item.interactive && (
                                    <span
                                        ref={el => { lineRefs.current[i] = el }}
                                        className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-500/50 opacity-100 origin-left pointer-events-none mb-1 md:mb-2 transition-opacity"
                                    />
                                )}

                                {/* Word Text */}
                                <span
                                    ref={el => { wordRefs.current[i] = el }}
                                    className="word inline-block relative text-inherit opacity-0"
                                >
                                    {item.text}
                                </span>
                            </span>
                        );
                    })}
                </h1>

                <div className="mt-12 md:mt-16 overflow-hidden">
                    <p className="hero-sub text-lg md:text-xl text-gray-400 max-w-2xl font-light opacity-0 animate-fade-in-up" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
                        Full-Stack Developer focused on meaningful motion and real-world impact.
                    </p>
                </div>
            </div>
        </section>
    );
}
