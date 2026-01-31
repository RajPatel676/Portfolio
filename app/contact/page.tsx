'use client';
import { useRef, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

export default function ContactPage() {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const xTo = gsap.quickTo(button, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(button, "y", { duration: 0.5, ease: "power3.out" });

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const x = e.clientX - centerX;
            const y = e.clientY - centerY;

            // Move the button 80% of the distance for stronger magnetic feel
            xTo(x * 0.8);
            yTo(y * 0.8);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            button.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-[#ededed] pt-32 pb-20 px-6 md:px-20 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-20 lg:gap-32">

                {/* LEFT: FORM SECTION */}
                <div className="flex flex-col gap-16">
                    <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.1] tracking-tight text-white">
                        Let’s start a <br />
                        project together
                    </h1>

                    <form className="flex flex-col gap-12 max-w-2xl w-full">
                        {/* 01. Name */}
                        <div className="group relative">
                            <span className="text-gray-500 text-sm mb-4 block">01</span>
                            <input
                                type="text"
                                placeholder="What's your name?"
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors cursor-text"
                            />
                        </div>

                        {/* 02. Email */}
                        <div className="group relative">
                            <span className="text-gray-500 text-sm mb-4 block">02</span>
                            <input
                                type="email"
                                placeholder="What's your email?"
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors cursor-text"
                            />
                        </div>

                        {/* 03. Organization */}
                        <div className="group relative">
                            <span className="text-gray-500 text-sm mb-4 block">03</span>
                            <input
                                type="text"
                                placeholder="What's the name of your organization? (optional)"
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors cursor-text"
                            />
                        </div>

                        {/* 04. Services */}
                        <div className="group relative">
                            <span className="text-gray-500 text-sm mb-4 block">04</span>
                            <input
                                type="text"
                                placeholder="What services are you looking for?"
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors cursor-text"
                            />
                        </div>

                        {/* 05. Message */}
                        <div className="group relative">
                            <span className="text-gray-500 text-sm mb-4 block">05</span>
                            <textarea
                                rows={4}
                                placeholder="Your message"
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors cursor-text resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-8">
                            <button
                                ref={buttonRef}
                                className="relative w-32 h-32 md:w-36 md:h-36 rounded-full bg-white text-black font-medium text-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                            >
                                Send it
                            </button>
                        </div>
                    </form>
                </div>

                {/* RIGHT: INFO SECTION */}
                <div className="flex flex-col gap-12 pt-4 lg:pt-32">
                    <div className="flex flex-col gap-8">
                        {/* Profile Image - Placeholder since user didn't specify one, using a generic avatar div if no image */}
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-neutral-800 overflow-hidden relative">
                            {/* Optional: Add actual image if available in artifacts, using a safe placeholder for now */}
                            <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-800 animate-pulse" />
                        </div>
                        <ArrowDown className="text-white/50 w-6 h-6 animate-bounce" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-4">Contact Details</h3>
                        <a href="mailto:raj@example.com" className="text-xl md:text-2xl hover:text-white/60 transition-colors">raj@example.com</a>
                        <a href="tel:+15550000000" className="text-xl md:text-2xl hover:text-white/60 transition-colors">+1 555 000 0000</a>
                        <p className="text-xl md:text-2xl text-gray-400">San Francisco, CA</p>
                    </div>

                    <div className="flex flex-col gap-2 mt-8">
                        <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-4">Socials</h3>
                        <div className="flex flex-col gap-2 text-lg text-gray-400">
                            <Link href="#" className="hover:text-white transition-colors">Awwwards</Link>
                            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
                            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                            <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
