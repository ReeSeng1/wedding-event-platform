export default function WhyChooseUs() {
    return (
        <section className="sticky top-0 z-20 min-h-screen w-full bg-[#FAF9F6] px-8 py-20">
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Why EverAfter
                    </p>
                    <h2 className="mt-4 text-4xl font-bold text-[#2B2B2B] md:text-5xl">
                        Wedding Planning Made Simple
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
                        Everything you need to make planning your special day 
                        easier, more organized, and more enjoyable.
                    </p>
                </div>
                <div className="mt-14 grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border border-[#E8E1CC] bg-[#FAF9F6] p-8">
                        <div className="text-3xl">💍</div>
                        <h3 className="mt-5 text-xl font-semibold text-[#2B2B2B]">
                            Trusted Vendors
                        </h3>
                        <p className="mt-3 leading-7 text-gray-600">
                            Discover vendors who can help bring your wedding 
                            vision to life.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-[#E8E1CC] bg-[#FAF9F6] p-8">
                        <div className="text-3xl">✨</div>
                        <h3 className="mt-5 text-xl font-semibold text-[#2B2B2B]">
                            Simple Planning
                        </h3>
                        <p className="mt-3 leading-7 text-gray-600">
                            Find what you need and organize your wedding
                            planning in one convenient place.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-[#E8E1CC] bg-[#FAF9F6] p-8">
                        <div className="text-3xl">❤️</div>
                        <h3 className="mt-5 text-xl font-semibold text-[#2B2B2B]">
                            Your Vision, Your Day
                        </h3>
                        <p className="mt-3 leading-7 text-gray-600">
                            Build a celebration that reflects your story,
                            your style, and the moments that matter most.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}