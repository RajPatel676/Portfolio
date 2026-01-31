'use client';

import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Header() {
    const containerRef = useRef<HTMLElement>(null);
    const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
    const underlineRef = useRef<HTMLDivElement>(null);
    const logoText = "Raj Patel";
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Desktop Animation
            mm.add("(min-width: 768px)", () => {
                // Initial Reveal
                gsap.fromTo(
                    lettersRef.current,
                    { opacity: 0, y: 15 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.05,
                        ease: "power3.out",
                        delay: 0.5 // Wait a bit for page load/intro
                    }
                );
            });

            // Mobile: Ensure visible instantly (cleanup handles revert, but good to ensure state)
            mm.add("(max-width: 767px)", () => {
                gsap.set(lettersRef.current, { opacity: 1, y: 0 });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = () => {
        // Letters subtle lift
        gsap.to(lettersRef.current, {
            y: -2,
            stagger: 0.02,
            duration: 0.3,
            ease: "power2.out"
        });
        // Underline slide in
        gsap.to(underlineRef.current, {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 0.4,
            ease: "power3.out"
        });
    };

    const handleMouseLeave = () => {
        // Letters return
        gsap.to(lettersRef.current, {
            y: 0,
            stagger: 0.02,
            duration: 0.3,
            ease: "power2.out"
        });
        // Underline slide out (to right)
        const tl = gsap.timeline();
        tl.to(underlineRef.current, {
            scaleX: 0,
            transformOrigin: "right center", // Exit to right
            duration: 0.3,
            ease: "power3.in"
        }).set(underlineRef.current, { transformOrigin: "left center" }); // Reset origin
    };

    return (
        <header
            ref={containerRef}
            className={cn(
                "fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none transition-transform duration-500 ease-in-out",
                !isVisible && "-translate-y-full"
            )}
        >
            <div className="pointer-events-auto">
                <Link
                    href="/"
                    className="group relative inline-block cursor-hover py-2"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="flex overflow-hidden">
                        {logoText.split("").map((char, i) => (
                            <span
                                key={i}
                                ref={(el) => { lettersRef.current[i] = el }}
                                className="inline-block font-medium tracking-wide text-xl md:text-2xl"
                                style={{ opacity: 0 }} // Hidden by default, handled by GSAP
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </div>
                    <div
                        ref={underlineRef}
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0"
                    />
                </Link>
            </div>

            <nav className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest pointer-events-auto">
                <Link href="#work" className="cursor-hover hover:opacity-70 transition-opacity">Expertise</Link>
                <Link href="#about" className="cursor-hover hover:opacity-70 transition-opacity">About</Link>
                <Link href="/contact" className="cursor-hover hover:opacity-70 transition-opacity">Contact</Link>
            </nav>

            <div className="md:hidden pointer-events-auto">
                <button className="text-sm uppercase font-medium cursor-hover">Menu</button>
            </div>
        </header>
    );
}
