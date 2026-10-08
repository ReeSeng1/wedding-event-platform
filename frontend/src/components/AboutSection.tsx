export default function AboutSection() {
    return (
        <section className="bg-[#FAF9F6] px-8 py-24">
            <div className="mx-auto max-w-6xl">
                <div className="grid items-center gap-12 md:grid-cols-2">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                            About EverAfter
                        </p>
                        <h2 className="mt-4 text-4xl font-bold text-[#2B2B2B] md:text-5xl">
                            Everything 
                            You Need for 
                            Your Perfect Day
                        </h2>
                        <p className="mt-6 leading-8 text-gray-600">
                            Planning a wedding should be exciting, not overwhelming.
                            EverAfter brings trusted wedding vendors and essential 
                            planning services together so you can focus on creating 
                            beautiful memories.
                        </p>
                        <p className="mt-4 leading-8 text-gray-600">
                            From photography and venues to decoration, beauty,
                            music, cakes, and more, discover the people who can
                            help bring your vision to life.
                        </p>
                    </div>
                    <div className="rounded-3xl border border-[#E8E1CC] bg-white p-8 shadow-sm">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                                <p className="text-4xl font-bold text-[#C9A227]">
                                    8+
                                </p>
                                <p className="mt-2 text-gray-600">
                                    Wedding Categories
                                </p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-[#C9A227]">
                                    1
                                </p>
                                <p className="mt-2 text-gray-600">
                                    Simple Platform
                                </p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-[#C9A227]">
                                    100%
                                </p>
                                <p className="mt-2 text-gray-600">
                                    Focused on Your Day
                                </p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-[#C9A227]">
                                    ∞
                                </p>
                                <p className="mt-2 text-gray-600">
                                    Beautiful Memories
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}