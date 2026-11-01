export default function VendorsPage() {
    return (
        <main className="min-h-screen bg-[#FAF9F6] px-6 py-20">
            <div className="mx-auto max-w-5xl text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#C9A227]">
                    Join EverAfter
                </p>
                <h1 className="mt-5 text-4xl font-bold text-[#2B2B2B] md:text-5xl">
                    Grow Your Wedding Business With Us
                </h1>
                <p className="mx-auto mt-6 max-w-2xl leading-8 text-gray-600">
                    Connect with couples planning their special day.
                    Showcase your services, receive booking requests,
                    and grow your business with EverAfter.
                </p>
                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                    <a href="/vendors/register" className="rounded-full bg-[#C9A227] px-8 py-4 font-semibold text-white transition hover:bg-[#B08D20]">
                        Register as a Vendor
                    </a>
                    <a href="/vendors/login" className="rounded-full border border-[#C9A227] px-8 py-4 font-semibold text-[#2B2B2B] transition hover:bg-[#E8E1CC]">
                       Vendor Login
                    </a>
                </div>
                <div className="mt-20 grid gap-8 text-left md:grid-cols-3">
                    <div className="rounded-2xl border border-[#E8E1CC] bg-white p-7">
                        <h2 className="text-xl font-bold text-[#2B2B2B]">
                            Create Your Profile
                        </h2>
                        <p className="mt-3 leading-7 text-gray-600">
                            Register your business and showcase your wedding services.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-[#E8E1CC] bg-white p-7">
                        <h2 className="text-xl font-bold text-[#2B2B2B]">
                            Get Approved
                        </h2>
                        <p className="mt-3 leading-7 text-gray-600">
                            Our admin team reviews your registration before your business becomes public.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-[#E8E1CC] bg-white p-7">
                        <h2 className="text-xl font-bold text-[#2B2B2B]">
                            Receive Requests
                        </h2>
                        <p className="mt-3 leading-7 text-gray-600">
                            Connect with couples looking for your services.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}