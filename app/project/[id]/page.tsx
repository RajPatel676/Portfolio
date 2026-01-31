'use client';

import React, { use } from 'react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock Data (In a real app, fetch from CMS or API)
const projectsData = [
    {
        id: "1",
        title: "LearnTUTOR",
        category: "AI Platform",
        description: "AI-powered personalized learning assistance.",
        fullDescription: "LearnTUTOR is a revolutionary platform that leverages large language models to provide personalized tutoring to students. By analyzing learning patterns, it adapts content delivery to match the student's pace and style.",
        stack: ["Next.js", "OpenAI API", "Tailwind CSS", "PostgreSQL"],
        year: "2025",
        role: "Full-Stack Dev",
        image: "https://placehold.co/1920x1080/101010/FFF?text=LearnTUTOR+Case+Study"
    },
    {
        id: "2",
        title: "Web3 Wallet",
        category: "Blockchain",
        description: "Secure browser extension for crypto assets.",
        fullDescription: "A non-custodial wallet extension designed for security and ease of use. It supports multiple chains and provides real-time transaction simulation to prevent scams.",
        stack: ["React", "Ethers.js", "Solidity", "Chrome Extension API"],
        year: "2024",
        role: "Blockchain Engineer",
        image: "https://placehold.co/1920x1080/101010/FFF?text=Web3+Wallet+Case+Study"
    },
    {
        id: "3",
        title: "Bookify",
        category: "System",
        description: "Comprehensive booking management solution.",
        fullDescription: "An all-in-one booking system for service-based businesses. Features include calendar management, automated reminders, and payment processing.",
        stack: ["Node.js", "Express", "MongoDB", "Socket.io"],
        year: "2024",
        role: "Backend Dev",
        image: "https://placehold.co/1920x1080/101010/FFF?text=Bookify+Case+Study"
    }
];

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const containerRef = useRef<HTMLDivElement>(null);

    const project = projectsData.find(p => p.id === id);

    if (!project) {
        notFound();
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".case-title", {
                y: 100,
                opacity: 0,
                duration: 1,
                delay: 0.2
            })
                .from(".case-info", {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1
                }, "-=0.5")
                .from(".case-image", {
                    y: 100,
                    opacity: 0,
                    scale: 0.95,
                    duration: 1.2
                }, "-=0.6")
                .from(".case-content", {
                    y: 50,
                    opacity: 0,
                    duration: 0.8
                }, "-=0.4");

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="pt-32 pb-20 px-6 md:px-20 min-h-screen bg-background text-foreground">
            <div className="mb-20">
                <Link href="/#work" className="text-sm uppercase tracking-widest text-gray-500 hover:text-white transition-colors mb-10 block w-fit cursor-hover">
                    ← Back to Work
                </Link>

                <h1 className="case-title text-[3rem] md:text-[6rem] leading-none font-bold tracking-tighter mb-12">
                    {project.title}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-t border-gray-800 pt-10">
                    <div className="case-info">
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Role</h3>
                        <p className="text-lg">{project.role}</p>
                    </div>
                    <div className="case-info">
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Year</h3>
                        <p className="text-lg">{project.year}</p>
                    </div>
                    <div className="case-info">
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Stack</h3>
                        <ul className="text-lg flex flex-wrap gap-2">
                            {project.stack.map(tech => <li key={tech} className="after:content-[','] last:after:content-[''] pr-1">{tech}</li>)}
                        </ul>
                    </div>
                    <div className="case-info">
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Live</h3>
                        <Link href="#" className="text-lg underline hover:text-gray-400 cursor-hover">View Live Site</Link>
                    </div>
                </div>
            </div>

            <div className="case-image w-full aspect-video bg-neutral-900 rounded-sm overflow-hidden mb-20 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="case-content grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-4">
                    <h2 className="text-2xl font-medium mb-4">The Challenge & Solution</h2>
                </div>
                <div className="md:col-span-8">
                    <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed mb-10">
                        {project.fullDescription}
                    </p>
                    <p className="text-lg text-gray-500 leading-relaxed">
                        (More detailed case study content would go here, explaining the process, challenges, and outcome. This is a placeholder for the rich storytelling aspect of the portfolio.)
                    </p>
                </div>
            </div>

            <div className="mt-32 border-t border-gray-800 pt-20 flex justify-between items-center">
                <span className="text-sm uppercase tracking-widest text-gray-500">Next Project</span>
                <Link href={`/project/${(parseInt(project.id) % 3) + 1}`} className="text-4xl md:text-6xl font-bold hover:text-gray-400 transition-colors cursor-hover">
                    {(projectsData.find(p => p.id === String((parseInt(project.id) % 3) + 1)) || projectsData[0]).title}
                </Link>
            </div>
        </main>
    );
}
