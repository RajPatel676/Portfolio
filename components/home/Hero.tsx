'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            // Assuming Intro runs before this, we delay slightly or control via prop
            // For now, we just animate in

            tl.from(".hero-line", {
                y: 100,
                opacity: 0,
                duration: 1.5,
                stagger: 0.2,
                delay: 0.5 // Wait for intro curtain
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-32 relative overflow-hidden"
        >
            <div className="max-w-[90vw] md:max-w-5xl">
                <h1 ref={textRef} className="text-[3rem] md:text-[5rem] lg:text-[6rem] leading-[1.1] font-bold tracking-tighter mix-blend-difference">
                    <div className="overflow-hidden">
                        <span className="hero-line block">I build scalable web,</span>
                    </div>
                    <div className="overflow-hidden">
                        <span className="hero-line block text-gray-400">AI-powered & Web3 products</span>
                    </div>
                    <div className="overflow-hidden">
                        <span className="hero-line block">with clean UX.</span>
                    </div>
                </h1>

                <div className="mt-12 overflow-hidden">
                    <p className="hero-line text-lg md:text-xl text-gray-400 max-w-2xl font-light">
                        Full-Stack Developer focused on meaningful motion and real-world impact.
                    </p>
                </div>
            </div>

            {/* Background Elements (Subtle Noise or Grain can be added via CSS) */}
        </section>
    );
}
