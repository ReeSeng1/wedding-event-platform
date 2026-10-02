"use client";

export default function VendorRequestsPage() {
    return (
        <main className="min-h-screen bg-[#F9F7F0] px-6 py-16">
            <div className="mx-auto max-w-5xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Client Requests
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        My Requests
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-gray-600">
                        View requests from clients who are interested in your services.
                    </p>
                </div>
                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 shadow-sm">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-[#C9A227]">
                                New Client Request
                            </p>
                            <h2 className="mt-2 text-2xl font-bold text-[#2B2B2B]">
                                Client Name
                            </h2>
                            <div className="mt-4 space-y-2 text-gray-600">
                                <p>
                                    <span className="font-medium text-[#2B2B2B]">
                                        Event:
                                    </span>{" "}
                                    Wedding
                                </p>
                                <p>
                                    <span className="font-medium text-[#2B2B2B]">
                                        Event Date:
                                    </span>{" "}
                                    December 20,2026
                                </p>
                                <p>
                                    <span className="font-medium text-[#2B2B2B]">
                                        Guest Count:
                                    </span>{" "}
                                    150 guests
                                </p>
                            </div>
                            <div className="mt-6 border-t border-[#E8E1CC] pt-6">
                                <p className="text-sm font-medium text-[#2B2B2B]">
                                    Client Message
                                </p>
                                <p className="mt-2 text-gray-600">
                                    I would like to know if you are available for my wedding and would like to discuss your services and pricing.
                                </p>
                            </div>
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                <button
                                   type="button"
                                   className="rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white hover:bg-[#B08D20]">
                                    Contact Client
                                </button>
                                <button
                                   type="button"
                                   className="rounded-full border border-[#C9A227] px-6 py-3 font-medium text-[#2B2B2B] hover:bg-[#C9A227]">
                                    View Details
                                </button>
                            </div>
                        </div>
                        <div className="rounded-full bg-[#E8E1CC] px-5 py-2 text-sm font-medium text-[#2B2B2B]">
                            Pending
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}