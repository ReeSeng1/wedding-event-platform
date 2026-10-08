export default function CTASection() {
    return (
        <section className="bg-[#2B2B2B] px-8 py-24">
            <div className="mx-auto max-w-4xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#E8D9A8]">
                    Your Day. Your Story. Your EverAfter.
                </p>
                <h2 className="mt-5 text-4xl font-bold text-white md:text-5xl">
                    Ready to Start Planning?
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80">
                    Discover the right vendors, build your plan, and take the
                    first step toward creating a celebration you'll always remember.
                </p>
                <a href="/find-vendors"
                   className="mt-8 inline-block rounded-full bg-[#C9A227] px-8 py-3 font-medium text-white hover:bg-[#B08D20]">
                    Start Planning
                </a>
            </div>
        </section>
    );
}