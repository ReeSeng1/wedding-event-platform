export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-[#FAF9F6] px-8 py-16">
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        How It Works
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Plan Your Perfect Wedding
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Finding the right vendors for your special day is simple.
                    </p>
                    <div className="mt-12 grid gap-8 md:grid-cols-3">
                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-8 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A227] text-lg font-bold text-white">
                                01
                            </div>
                            <h2 className="mt-5 text-xl font-semibold text-[#2B2B2B]">
                                Discover Vendors
                            </h2>
                            <p className="mt-3 leading-7 text-gray-600">
                                Browse vendors across photography, decoration, venues, beauty, music, cakes, and more.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-8 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A227] text-lg font-bold text-white">
                                02
                            </div>
                            <h2 className="mt-5 text-xl font-semibold text-[#2B2B2B]">
                                Build Your Plan
                            </h2>
                            <p className="mt-3 leading-7 text-gray-600">
                                Choose the vendors you want and submit your wedding or event details.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-8 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A227] text-lg font-bold text-white">
                                03
                            </div>
                            <h2 className="mt-5 text-xl font-semibold text-[#2B2B2B]">
                                Check Availability
                            </h2>
                            <p className="mt-3 leading-7 text-gray-600">
                                We check vendor availability for your event date and confirm the vendors who are available.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}