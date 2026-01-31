'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

export function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);

    const projects = [
        {
            id: 1,
            title: "LearnTUTOR",
            category: "AI Platform",
            description: "AI-powered personalized learning assistance.",
            image: "https://placehold.co/800x600/101010/FFF?text=LearnTUTOR" // Placeholder
        },
        {
            id: 2,
            title: "Web3 Wallet",
            category: "Blockchain",
            description: "Secure browser extension for crypto assets.",
            image: "https://placehold.co/800x600/101010/FFF?text=Web3+Wallet"
        },
        {
            id: 3,
            title: "Bookify",
            category: "System",
            description: "Comprehensive booking management solution.",
            image: "https://placehold.co/800x600/101010/FFF?text=Bookify"
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const projectCards = gsap.utils.toArray('.project-card');

            projectCards.forEach((card: unknown) => {
                gsap.from(card as HTMLElement, {
                    scrollTrigger: {
                        trigger: card as HTMLElement,
                        start: "top bottom-=10%",
                        toggleActions: "play none none reverse"
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="work" className="py-32 px-6 md:px-20 bg-background text-foreground">
            <div className="mb-20">
                <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-4">Selected Work</h2>
                <div className="h-[1px] w-full bg-gray-800" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
                {projects.map((project) => (
                    <div key={project.id} className="project-card group cursor-hover">
                        <Link href={`/project/${project.id}`} className="block">
                            <div className="relative overflow-hidden aspect-[4/3] bg-neutral-900 mb-6 rounded-sm">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-medium mb-1">{project.title}</h3>
                                    <p className="text-gray-400 text-sm">{project.category}</p>
                                </div>
                                <span className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                    View Case
                                </span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="mt-20 text-center">
                <Link href="https://github.com/RajPatel676" target="_blank" className="inline-block border-b border-gray-600 pb-1 hover:border-white transition-colors cursor-hover">
                    View All Projects (GitHub)
                </Link>
            </div>
        </section>
    );
}
