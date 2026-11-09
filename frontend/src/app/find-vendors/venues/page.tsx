"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useVendorSelection } from "@/components/VendorSelectionContext";

interface Vendor {
    id: number;
    businessName: string;
    category: string;
    location: string;
    description?: string | null;
    serviceName?: string | null;
    serviceDescription?: string | null;
    servicePrice?: string | null;
    portfolioImage?: string | null;
}

export default function VenuePage() {
    const router =useRouter();
    const {selections, selectVendor, removeVendor} = useVendorSelection();

    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadVendors() {
            try {
                const response = await fetch("http://localhost:5000/api/vendors/public");
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Unable to load venue vendors."
                    );
                }
                const venueVendors = (data.vendors || []).filter(
                    (vendor: Vendor) =>
                        vendor.category?.toLowerCase() === "venues"
                );
                setVendors(venueVendors);
            } catch (error) {
                console.error("Failed to load venue vendors:", error);
                setError(
                    error instanceof Error
                       ? error.message
                       : "Unable to load venue vendors."
                );
            } finally {
                setLoading(false);
            }
        }
        loadVendors();
    }, []);

    function handleSelect(vendorName: string) {
        if(selections.venue === vendorName) {
            removeVendor("venue");
        } else {
            selectVendor("venue", vendorName);
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
                        Venue Vendors
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Choose one venue for your special day.
                    </p>
                </div>
                
                {!loading && !error && vendors.length > 0 && (
                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {vendors.map((vendor) => (
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
                                    <div className="flex h-56 w-full items-center justify-center bg-[#E8E1CC] text-lg font-semibold text-[#2B2B2B]">
                                        Venue
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
                                            "No description available."}
                                    </p>

                                    {vendor.serviceName && (
                                        <p className="mt-3 text-sm font-medium text-[#2B2B2B]">
                                            Service: {vendor.serviceName}
                                        </p>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleSelect(vendor.businessName)
                                        }
                                        className={`mt-5 w-full rounded-full border py-2 ${
                                            selections.venue === vendor.businessName
                                                ? "border-[#C9A227] bg-[#C9A227] text-white"
                                                : "border-[#C9A227] text-[#C9A227] hover:bg-[#FAF9F6]"
                                        }`}
                                    >
                                        {selections.venue === vendor.businessName
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
                        Selected Venue
                    </h2>
                    {selections.venue === "" ? (
                        <p className="mt-3 text-gray-500">
                            You have not selected a venue yet.
                        </p>
                    ) : (
                        <div className="mt-4 flex flex-wrap gap-3">
                                <span 
                                   className="rounded-full bg-[#FAF9F6] px-4 py-2 text-sm text-[#2B2B2B]">
                                    {selections.venue}
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
                   disabled={selections.venue === ""}
                   className="mt-8 w-full rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50">
                    Continue to Event Details
                </button>
                </div>
            </div>
        </main>
    );
}