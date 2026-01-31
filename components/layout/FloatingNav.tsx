'use client';

import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
    { title: "Home", href: "/" },
    { title: "Work", href: "#work" },
    { title: "About", href: "#about" },
    { title: "Contact", href: "#contact" },
];

export function FloatingNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const hamburgerLinesRef = useRef<(HTMLSpanElement | null)[]>([]);

    // Helper refs for animations
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    // 1. Scroll Visibility Logic
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                if (isOpen) setIsOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isOpen]);

    // 2. Magnetic Effect Logic
    useLayoutEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const xTo = gsap.quickTo(button, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(button, "y", { duration: 0.5, ease: "power3.out" });

        const handleMouseMove = (e: MouseEvent) => {
            // Only apply magnetic effect if visible and NOT open (or simply always when visible)
            // Typically magnetic effect is on the BUTTON wrapper.
            // Let's implement it relative to the fixed container.

            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;

            // Check proximity (e.g., 100px radius)
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance < 100) {
                xTo(distanceX * 0.2); // 20% magnetic pull
                yTo(distanceY * 0.2);
            } else {
                xTo(0);
                yTo(0);
            }
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // 3. Open/Close Animation
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ paused: true });

            // Overlay Reveal (Clip Path or Scale)
            // Let's use circular clip path from the button position (bottom-right)
            tl.fromTo(overlayRef.current,
                { clipPath: "circle(0% at 90% 90%)", visibility: "hidden" }, // roughly bottom right
                { clipPath: "circle(150% at 90% 90%)", visibility: "visible", duration: 0.8, ease: "power3.inOut" }
            );

            // Stagger Links
            tl.fromTo(navLinksRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" },
                "-=0.4"
            );

            timelineRef.current = tl;

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Effect to trigger animation based on state
    useEffect(() => {
        if (isOpen) {
            timelineRef.current?.play();
            document.body.style.overflow = 'hidden'; // Lock scroll
        } else {
            timelineRef.current?.reverse();
            document.body.style.overflow = ''; // Unlock scroll
        }
    }, [isOpen]);

    // Button Icon Animation (Hamburger <-> X)
    useLayoutEffect(() => {
        const top = hamburgerLinesRef.current[0];
        const bot = hamburgerLinesRef.current[1];

        if (isOpen) {
            gsap.to(top, { rotation: 45, y: 6, duration: 0.3 });
            gsap.to(bot, { rotation: -45, y: -6, duration: 0.3 });
        } else {
            gsap.to(top, { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(bot, { rotation: 0, y: 0, duration: 0.3 });
        }
    }, [isOpen]);




    return (
        <div ref={containerRef} className="z-[9999]">
            {/* OVERLAY NAVIGATION */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col justify-center items-center text-center invisible"
            >
                <nav className="flex flex-col space-y-8">
                    {NAV_LINKS.map((link, i) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            ref={el => { navLinksRef.current[i] = el }}
                            onClick={() => setIsOpen(false)}
                            className="text-5xl md:text-7xl font-bold tracking-tighter text-white hover:text-white/50 transition-colors cursor-pointer block overflow-hidden"
                        >
                            {link.title}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* FLOATING BUTTON */}
            {/* Using a fixed container for position, internal div for magnetic movement */}
            <div className={cn(
                "fixed bottom-8 right-8 md:bottom-12 md:right-12 z-50 transition-transform duration-500 ease-out",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
            )}>
                <button
                    ref={buttonRef}
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white text-black flex flex-col justify-center items-center gap-2 shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300"
                >
                    <span ref={el => { hamburgerLinesRef.current[0] = el }} className="w-8 h-[2px] bg-black block origin-center" />
                    <span ref={el => { hamburgerLinesRef.current[1] = el }} className="w-8 h-[2px] bg-black block origin-center" />
                </button>
            </div>
        </div>
    );
}
