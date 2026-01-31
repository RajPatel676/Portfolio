'use client';

import Link from 'next/link';

export function Contact() {
    return (
        <section id="contact" className="py-32 px-6 md:px-20 min-h-[50vh] flex flex-col justify-between">
            <div>
                <h2 className="text-[3rem] md:text-[6rem] leading-none font-bold tracking-tighter mb-10">
                    Let&apos;s build <br /> something <span className="text-gray-500">meaningful.</span>
                </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-10 md:gap-20 mt-10">
                <div>
                    <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4">Contact</h3>
                    <Link href="mailto:rdpatel.dev@gmail.com" className="text-xl hover:text-gray-400 transition-colors cursor-hover block">
                        rdpatel.dev@gmail.com
                    </Link>
                </div>

                <div>
                    <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4">Socials</h3>
                    <div className="flex flex-col gap-2">
                        <Link href="https://github.com/RajPatel676" target="_blank" className="text-xl hover:text-gray-400 transition-colors cursor-hover">
                            GitHub
                        </Link>
                        <Link href="https://www.linkedin.com/in/raj-patel-00717a283" target="_blank" className="text-xl hover:text-gray-400 transition-colors cursor-hover">
                            LinkedIn
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-20 pt-10 border-t border-gray-900 flex justify-between text-xs text-gray-600 uppercase tracking-widest">
                <span>© 2026 Raj Patel</span>
                <span>Ahmedabad, India</span>
            </div>
        </section>
    );
}
