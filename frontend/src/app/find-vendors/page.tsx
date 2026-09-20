"use client";

import { useState } from "react";

export default function FindVendorsPage() {
    const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

    return (
        <main className="min-h-screen bg-[#FAF9F6] px-8 py-16">
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Start Planning
                    </p>

                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Build Your Wedding Plan
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Choose the vendors you need for your special day and build
                        your personalized wedding plan.
                    </p>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 text-center">
                            <h2 className="text-lg font-semibold text-[#2B2B2B]">
                                Photography
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Find photographers for your special moments.
                            </p>

                            <button
                                onClick={() =>
                                    setSelectedVendors((current) =>
                                        current.includes("Photography")
                                            ? current
                                            : [...current, "Photography"]
                                    )
                                }
                                className="mt-5 rounded-full border border-[#C9A227] px-5 py-2 text-[#C9A227] hover:bg-[#FAF9F6]"
                            >
                                Choose
                            </button>
                        </div>
                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 text-center">
                            <h2 className="text-lg font-semibold text-[#2B2B2B]">
                                Decoration
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Find decorators to create your perfect setting.
                            </p>

                            <button
                                onClick={() =>
                                    setSelectedVendors((current) =>
                                        current.includes("Decoration")
                                            ? current
                                            : [...current, "Decoration"]
                                    )
                                }
                                className="mt-5 rounded-full border border-[#C9A227] px-5 py-2 text-[#C9A227] hover:bg-[#FAF9F6]"
                            >
                                Choose
                            </button>
                        </div>
                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 text-center">
                            <h2 className="text-lg font-semibold text-[#2B2B2B]">
                                Venues
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Find a venue that fits your event.
                            </p>

                            <button
                                onClick={() =>
                                    setSelectedVendors((current) =>
                                        current.includes("Venues")
                                            ? current
                                            : [...current, "Venues"]
                                    )
                                }
                                className="mt-5 rounded-full border border-[#C9A227] px-5 py-2 text-[#C9A227] hover:bg-[#FAF9F6]"
                            >
                                Choose
                            </button>
                        </div>
                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 text-center">
                            <h2 className="text-lg font-semibold text-[#2B2B2B]">
                                Makeup & Hair
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Find beauty professionals for your event.
                            </p>

                            <button
                                onClick={() =>
                                    setSelectedVendors((current) =>
                                        current.includes("Makeup & Hair")
                                            ? current
                                            : [...current, "Makeup & Hair"]
                                    )
                                }
                                className="mt-5 rounded-full border border-[#C9A227] px-5 py-2 text-[#C9A227] hover:bg-[#FAF9F6]"
                            >
                                Choose
                            </button>
                        </div>
                    </div>

                    {/* My Wedding Plan */}
                    <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-6">
                        <h2 className="text-xl font-semibold text-[#2B2B2B]">
                            My Wedding Plan
                        </h2>

                        {selectedVendors.length === 0 ? (
                            <p className="mt-4 text-gray-500">
                                You have not selected any vendors yet.
                            </p>
                        ) : (
                            <div className="mt-4 flex flex-wrap gap-3">
                                {selectedVendors.map((vendor) => (
                                    <div
                                        key={vendor}
                                        className="flex items-center gap-2 rounded-full border border-[#E8E1CC] bg-[#FAF9F6] px-4 py-2"
                                    >
                                        <span className="text-sm text-[#2B2B2B]">
                                            {vendor}
                                        </span>

                                        <button
                                            onClick={() =>
                                                setSelectedVendors((current) =>
                                                    current.filter(
                                                        (item) => item !== vendor
                                                    )
                                                )
                                            }
                                            className="text-sm text-[#C9A227] hover:text-[#B08D20]"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

