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

export default function DecorationPage() {
    const router = useRouter();
    const { selections, selectVendor, removeVendor} = useVendorSelection();

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
                        data.message || "Unable to load decoration vendors."
                    );
                }
                const decorationVendors = (data.vendors || []).filter(
                    (vendor: Vendor) =>
                        vendor.category?.toLowerCase() === "decoration"
                    );
                    setVendors(decorationVendors);
            } catch (error) {
                console.error("Failed to load decoration vendors:", error);
                setError(
                    error instanceof Error 
                       ? error.message
                       : "Unable to load  decoration vendors."
                );
            } finally {
                setLoading(false);
            }
        }
        loadVendors();
    }, []);

    function handleSelect(vendorName: string) {
        if (selections.decoration === vendorName) {
            removeVendor("decoration");
        }else {
            selectVendor("decoration", vendorName);
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
                        Decoration Vendors
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Choose the decoration vendor you want for your special day.
                    </p>
                </div>
                {loading && (
                    <p className="mt-12 text-center text-gray-600">
                        Loading decoration vendors...
                    </p>
                )}
                {error && (
                    <div className="mt-10 rounded-2xl bg-red-50 p-6 text-center text-red-700">
                        {error}
                    </div>
                )}
                {!loading && !error && vendors.length === 0 && (
                    <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 text-center">
                        <h2 className="text-xl font-bold text-[#2B2B2B]">
                            No Decoration Vendors Available
                        </h2>
                        <p className="mt-2 text-gray-600">
                            There are currently no approved decoration vendors.
                        </p>
                    </div>
                )}
                {!loading && !error && vendors.length > 0 && (
                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {vendors.map((vendor) => (
                            <div
                              key={vendor.id}
                              className="overflow-hidden rounded-2xl border border-[#E8E1CC] bg-white shadow-sm">
                                {vendor.portfolioImage ? (
                                    <img src={vendor.portfolioImage} alt={vendor.businessName} className="h-56 w-full object-contain bg-[#FAF9F6]" />
                                ) : (
                                    <div className="flex h-56 w-full items-center justify-center bg-[#E8E1CC] text-lg font-semibold text-[#2B2B2B]">
                                        Decoration
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
                                        selections.decoration === vendor.businessName
                                           ? "border-[#C9A227] bg-[#C9A227] text-white"
                                           : "border-[#C9A227] text-[#C9A227] hover:bg-[#FAF9F6]"
                                       }`}>
                                        {selections.decoration === vendor.businessName
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
                        Selected Decoration Vendors
                    </h2>
                    {selections.decoration === "" ? (
                        <p className="mt-3 text-gray-500">
                            You have not selected a decoration vendor yet.
                        </p>
                    ) : (
                        <div className="mt-4 flex flex-wrap gap-3">
                            
                                <span 
                                  
                                   className="rounded-full bg-[#FAF9F6] px-4 py-2 text-sm text-[#2B2B2B]">
                                    {selections.decoration}
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
                      disabled={selections.decoration === ""}
                      className="mt-8 w-full rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50">
                         Continue to Event Details
                    </button>
                </div>
            </div>
        </main>
    );
}