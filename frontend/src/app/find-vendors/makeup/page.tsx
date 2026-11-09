"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useVendorSelection } from "@/components/VendorSelectionContext";

interface Vendor {
id: number;
businessName: string;
category: string;
location: string;
description?: string;
serviceName?: string;
serviceDescription?: string;
servicePrice?: string;
portfolioImage?: string;
}

export default function MakeupPage() {
    const router =useRouter();
    const {selections, selectVendor, removeVendor} = useVendorSelection();

    const [makeupVendors, setMakeupVendors] = useState<Vendor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
    async function fetchVendors() {
        try {
            const response = await fetch(
                "http://localhost:5000/api/vendors/public"
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to load vendors.");
            }

            const approvedVendors = (data.vendors || []).filter(
                (vendor: Vendor) =>
                    vendor.category?.toLowerCase() === "makeup & hair"
            );

            setMakeupVendors(approvedVendors);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong while loading vendors."
            );
        } finally {
            setLoading(false);
        }
    }

    fetchVendors();
}, []);

    function handleSelect(vendorName: string) {
        if (selections.makeup === vendorName) {
            removeVendor("makeup");
        } else {
            selectVendor("makeup", vendorName)
        }
    }

    return (
        <main className="min-h-screen bg-[#F9F7F0] px-8 py-16">
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Find Vendors
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Makeup & Hair Vendors
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Choose one beauty professional for your special day.
                    </p>
                </div>
                {loading ? (
                <p className="mt-12 text-center text-gray-500">
                    Loading makeup & hair vendors...
                </p>
            ) : error ? (
                <p className="mt-12 text-center text-red-600">
                    {error}
                </p>
            ) : makeupVendors.length === 0 ? (
                <p className="mt-12 text-center text-gray-500">
                    No approved makeup & hair vendors are available yet.
                </p>
            ) : (
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {makeupVendors.map((vendor) => (
                        <div
                            key={vendor.id}
                            className="overflow-hidden rounded-2xl border border-[#E8E1CC] bg-white shadow-sm"
                        >
                            {vendor.portfolioImage ? (
                                <img
                                    src={vendor.portfolioImage}
                                    alt={vendor.businessName}
                                    className="h-56 w-full bg-[#FAF9F6] object-contain"
                                />
                            ) : (
                                <div className="flex h-56 w-full items-center justify-center bg-[#FAF9F6] text-gray-400">
                                    No portfolio image
                                </div>
                            )}

                            <div className="p-5">
                                <h2 className="text-xl font-semibold text-[#2B2B2B]">
                                    {vendor.businessName}
                                </h2>

                                <p className="mt-2 text-sm text-gray-500">
                                    📍 {vendor.location}
                                </p>

                                <p className="mt-3 text-sm text-gray-600">
                                    {vendor.description ||
                                        vendor.serviceDescription ||
                                        vendor.serviceName ||
                                        "Professional makeup & hair services."}
                                </p>

                                <button
                                    onClick={() =>
                                        handleSelect(vendor.businessName)
                                    }
                                    className={`mt-5 w-full rounded-full border py-2 ${
                                        selections.makeup === vendor.businessName
                                            ? "border-[#C9A227] bg-[#C9A227] text-white"
                                            : "border-[#C9A227] text-[#C9A227] hover:bg-[#FAF9F6]"
                                    }`}
                                >
                                    {selections.makeup === vendor.businessName
                                        ? "Deselect"
                                        : "Select Vendor"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-6">
                    <h2 className="text-xl font-semibold text-[#2B2B2B]">
                        Selected Makeup & Hair vendor
                    </h2>
                    {selections.makeup === "" ? (
                        <p className="mt-3 text-gray-500">
                            You have not selected a makeup & hair vendor yet.
                        </p>
                    ) : (
                        <div className="mt-4 flex flex-wrap gap-3">
                                <span 
                                   className="rounded-full bg-[#FAF9F6] px-4 py-2 text-sm text-[#2B2B2B]">
                                    {selections.makeup}
                                </span>
                        </div>
                    )}
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <button onClick={() => router.push("/find-vendors")}
                            className="w-full rounded-full border border-[#C9A227] px-6 py-3 font-medium text-[#C9A227] hover:bg-[#FAF9F6]">
                        Back to Find Vendors
                    </button>
                <button 
                   onClick={() => router.push("/event-details")}
                   disabled={selections.makeup === ""}
                   className="mt-8 w-full rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50">
                    Continue to Event Details
                </button>
            </div>
            </div>
        </main>
    );
}