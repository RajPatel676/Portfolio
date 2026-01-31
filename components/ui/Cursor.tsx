'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        // We only want this on desktop
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice || window.innerWidth < 768) return;

        if (!cursor || !follower) return;

        // Use quickTo for high performance mouse tracking
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3.out" });

        // Follower has a slightly softer lag
        const xToFollow = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3.out" });
        const yToFollow = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3.out" });

        const moveCursor = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
            xToFollow(e.clientX);
            yToFollow(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);

        // Hover Interaction Logic
        const handleMouseEnter = () => {
            setIsHovering(true);
            gsap.to(cursor, { scale: 0, duration: 0.2 });
            gsap.to(follower, {
                scale: 3,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                opacity: 0.1,
                mixBlendMode: 'difference', // Cool inversion effect
                duration: 0.3
            });
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            gsap.to(cursor, { scale: 1, duration: 0.2 });
            gsap.to(follower, {
                scale: 1,
                backgroundColor: 'transparent',
                opacity: 1,
                mixBlendMode: 'normal',
                duration: 0.3
            });
        };

        const addListeners = () => {
            const hoverables = document.querySelectorAll('a, button, .cursor-hover, input, textarea');
            hoverables.forEach((el) => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };

        addListeners();

        const observer = new MutationObserver(addListeners);
        observer.observe(document.body, { subtree: true, childList: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            observer.disconnect();
            const hoverables = document.querySelectorAll('a, button, .cursor-hover, input, textarea');
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
                className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-12 h-12 border border-white/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-colors"
            />
        </>
    );
}
