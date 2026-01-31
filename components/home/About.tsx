'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".about-text", {
                scrollTrigger: {
                    trigger: ".about-container",
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="about" className="about-container py-32 px-6 md:px-20 bg-background">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-4">
                    <h2 className="text-sm uppercase tracking-widest text-gray-500 about-text">About Me</h2>
                </div>
                <div className="md:col-span-8">
                    <p className="text-2xl md:text-4xl leading-relaxed font-light text-gray-300 about-text mb-10">
                        I am a full-stack developer with a product mindset. I don&apos;t just write code; I build systems that solve real problems.
                    </p>
                    <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl about-text mb-6">
                        Currently studying Engineering at LJ University, I specialize in building next-gen web applications, exploring the possibilities of AI, and diving deep into Web3 protocols.
                    </p>
                    <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl about-text">
                        My philosophy is simple: Design should be invisible, and motion should be meaningful.
                    </p>
                </div>
            </div>
        </section>
    );
}
