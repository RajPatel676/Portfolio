'use client';

import {
    HoverSlider,
    HoverSliderImage,
    HoverSliderImageWrap,
    TextStaggerHover
} from '@/components/ui/animated-slideshow';

const EXPERTISE_ITEMS = [
    {
        id: "web",
        title: "Web Engineering",
        // Abstract code/structure high-res
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "ai",
        title: "Generative AI",
        // Neural/Node visualization
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
    },
    {
        id: "web3",
        title: "Decentralized Web",
        // Blockchain/structure
        imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop"
    },
    {
        id: "ux",
        title: "Product Design",
        // Abstract flow/design
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop"
    }
];

export function Expertise() {
    return (
        <section id="work" className="py-24 md:py-32 text-foreground overflow-hidden relative">

            {/* Header */}
            <div className="px-6 md:px-20 mb-16 md:mb-24">
                <div className="max-w-[90vw] md:max-w-6xl mx-auto">
                    <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-500 mb-6">/ Expertise</h2>
                    <div className="h-[1px] w-full bg-white/10" />
                </div>
            </div>

            <HoverSlider className="w-full px-6 md:px-20">
                <div className="max-w-[90vw] md:max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-12 md:gap-20">

                    {/* Left: Text List (More space) */}
                    <div className="flex flex-col space-y-6 md:space-y-8 w-full md:w-6/12">
                        {EXPERTISE_ITEMS.map((item, index) => (
                            <TextStaggerHover
                                key={item.id}
                                index={index}
                                text={item.title}
                                className="cursor-pointer text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white data-[state=active]:text-white/50 transition-colors duration-300"
                            />
                        ))}
                    </div>

                    {/* Right: Image Display (Smaller, Taller) */}
                    <div className="w-full md:w-5/12 aspect-[4/5]">
                        <HoverSliderImageWrap className="rounded-sm overflow-hidden border border-white/10">
                            {EXPERTISE_ITEMS.map((item, index) => (
                                <div key={item.id}>
                                    <HoverSliderImage
                                        index={index}
                                        imageUrl={item.imageUrl}
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="size-full object-cover"
                                        loading="eager"
                                        decoding="async"
                                    />
                                    {/* Overlay for contrast */}
                                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                                </div>
                            ))}
                        </HoverSliderImageWrap>
                    </div>

                </div>
            </HoverSlider>
        </section>
    );
}
