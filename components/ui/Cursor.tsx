'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: 'power2.out'
            });
        };

        window.addEventListener('mousemove', moveCursor);

        // Hover effects
        const handleMouseEnter = () => {
            gsap.to(cursor, { scale: 0, duration: 0.2 });
            gsap.to(follower, { scale: 3, backgroundColor: 'rgba(255, 255, 255, 0.1)', mixBlendMode: 'difference', duration: 0.2 });
        };

        const handleMouseLeave = () => {
            gsap.to(cursor, { scale: 1, duration: 0.2 });
            gsap.to(follower, { scale: 1, backgroundColor: 'transparent', mixBlendMode: 'normal', duration: 0.2 });
        };

        const addListeners = () => {
            const hoverables = document.querySelectorAll('a, button, .cursor-hover');
            hoverables.forEach((el) => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };

        addListeners();

        // Observer for dynamic content
        const observer = new MutationObserver(addListeners);
        observer.observe(document.body, { subtree: true, childList: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            observer.disconnect();
            const hoverables = document.querySelectorAll('a, button, .cursor-hover');
            hoverables.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [pathname]);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform hidden md:block"
            />
        </>
    );
}
