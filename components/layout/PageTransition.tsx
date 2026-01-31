'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

const routes: { [key: string]: string } = {
    '/': 'Home',
    '/contact': 'Contact'
};

export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGPathElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (pathname === '/') return; // Skip transition for home (Intro handles it)

        const ctx = gsap.context(() => {
            const curved = "M0 0 L100 0 L100 50 Q50 100 0 50 Z";
            const topFlat = "M0 0 L100 0 L100 0 Q50 0 0 0 Z";
            const full = "M0 0 L100 0 L100 100 Q50 100 0 100 Z";

            // Initial State: Full Cover
            gsap.set(svgRef.current, { attr: { d: full } });
            gsap.set(textRef.current, { opacity: 1, y: 0 });

            const tl = gsap.timeline();

            // 1. Text Entry (Already visible mostly, but let's ensure it lingers)
            tl.to({}, { duration: 0.5 });

            // 2. Text Exit
            tl.to(textRef.current, {
                y: -100,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            });

            // 3. Curtain Lift (Sync with text exit)
            tl.to(svgRef.current, {
                attr: { d: curved },
                duration: 0.8,
                ease: "power2.in"
            }, "-=0.3")
                .to(svgRef.current, {
                    attr: { d: topFlat },
                    duration: 0.8,
                    ease: "power2.out"
                }, ">-0.1");

            // Cleanup: Hide container to prevent clicks
            tl.set(containerRef.current, { display: 'none' });

        }, containerRef);

        return () => ctx.revert();
    }, [pathname]);

    // If Home, render children directly (Intro handles animation)
    if (pathname === '/') return <>{children}</>;

    return (
        <div className="relative">
            {/* Transition Overlay */}
            <div
                ref={containerRef}
                className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
            >
                {/* SVG Background */}
                <svg className="absolute inset-0 w-full h-[120%] -top-[20%] z-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path
                        ref={svgRef}
                        d="M0 0 L100 0 L100 100 Q50 100 0 100 Z"
                        className="fill-[#0a0a0a]"
                    />
                </svg>

                {/* Page Title */}
                <div ref={textRef} className="relative z-10 overflow-hidden">
                    <span className="block text-5xl md:text-8xl font-sans font-light tracking-tight text-white whitespace-nowrap">
                        {routes[pathname] || 'Loading...'}
                    </span>
                </div>
            </div>

            {/* Content */}
            {children}
        </div>
    );
}
