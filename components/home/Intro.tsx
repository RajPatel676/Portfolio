'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export function Intro({ onComplete }: { onComplete: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
    const words = ["Hello", "Namaste", "Bonjour"];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    onComplete();
                },
            });

            // Filter out nulls to be safe
            const els = wordsRef.current;
            if (!els[0] || !els[1] || !els[2]) return;

            // Set initial state
            gsap.set(els, { y: 20, opacity: 0 });

            // Animate words cycle
            tl.to(els[0], { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
                .to(els[0], { opacity: 0, y: -20, duration: 0.6, ease: "power3.in" }, "+=0.4")

                .to(els[1], { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.2")
                .to(els[1], { opacity: 0, y: -20, duration: 0.6, ease: "power3.in" }, "+=0.4")

                .to(els[2], { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.2")
                .to(els[2], { opacity: 0, y: -20, duration: 0.6, ease: "power3.in" }, "+=0.4")

                // Curtain transition
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: "expo.inOut"
                }, "-=0.2");

        }, containerRef);

        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-400 text-black"
        >
            <div className="grid grid-cols-1 place-items-center h-24 w-full overflow-hidden">
                {words.map((word, i) => (
                    <div
                        key={word}
                        ref={el => { wordsRef.current[i] = el }}
                        className="col-start-1 row-start-1 text-5xl md:text-7xl font-sans font-light tracking-wide text-center whitespace-nowrap opacity-0 text-black"
                    >
                        {word}
                    </div>
                ))}
            </div>
        </div>
    );
}
