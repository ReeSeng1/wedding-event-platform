export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#FAF9F6] px-8 py-16">
            <div className="mx-auto max-w-5xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        About Us
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Making Event Planning Simpler
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl leading-7 text-gray-600">
                        We connect couples and event planners with trusted vendors, making it easier to discover the services they need for their special day.
                    </p>
                </div>
                <div className="mt-12 rounded-3xl border border-[#E8E1CC] bg-white p-8 md:p-12">
                    <h2 className="text-2xl font-bold text-[#2B2B2B]">
                        Our Purpose
                    </h2>
                    <p className="mt-4 leading-7 text-gray-600">
                        Our platform brings vendors and clients together in one place. Clients can explore different vendors, choose the services they need, and submit their event details so vendor availability can be checked.
                    </p>
                </div>
            </div>
        </main>
    );
}