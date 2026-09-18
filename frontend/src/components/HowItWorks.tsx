const steps = [
    {
        number: "01",
        title: "Discover Vendors",
        description: "Browse vendors across photography, decoration, venues, catering, beauty, and more.",
    },
    {
        number: "02",
        title: "Build Your Plan",
        description: "Choose the vendors you want and submit your wedding or event details.",
    },
    {
        number: "03",
        title: "Check Availability",
        description: "We check vendor availability for your event date and confirm the vendors who are available",
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-white px-8 py-20">
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#2B2B2B]">
                        How It Works
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-gray-600">
                        Finding the right vendors for your special day is simple
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {steps.map((step) => (
                        <div key={step.number} className="text-center">
                            <div className="mx-auto flex h-14 w-14 items-center jusify-center rounded-full bg-[#C9A227] text-lg font-bold text-white">
                                {step.number}
                            </div>
                            <h3 className="mt-5 text-xl font-semibold text-[#2B2B2B]">
                                {step.title}
                            </h3>
                            <p className="mt-3 leading-7 text-gray-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}