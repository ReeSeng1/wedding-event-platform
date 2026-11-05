"use client";

import React from "react";
import { useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { useVendorSelection } from "@/components/VendorSelectionContext";
interface PhotographyVendor {
    id: number;
    businessName: string;
    category: string;
    location: string;
    description: string;
    portfolioDescription: string;
    portfolioImage: string;
}

export default function PhotographyPage() {

    const router = useRouter();
    const { selections, selectVendor, removeVendor} = useVendorSelection();
    const [vendors, setVendors] = useState<PhotographyVendor[]>([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        async function fetchVendors() {
            try {
                const response = await fetch("http://localhost:5000/api/vendors/public", {
                    cache: "no-store"
                });
                if (!response.ok) {
                    throw new Error("Unable to load vendors.");
                }
                const data = await response.json();
                const photographyVendors = data.vendors.filter(
                    (vendor: PhotographyVendor) =>
                        vendor.category.trim().toLowerCase() === "photography"
                );
                setVendors(photographyVendors);
            } catch (error) {
                console.error("Failed to fetch photography vendors:", error);
                setError("Unable to load photography vendors. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        fetchVendors();
    }, []);
    
    function handleSelect(vendorName: string) {
        if (selections.photography === vendorName) {
            removeVendor("photography");
        } else {
            selectVendor("photography", vendorName);
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
                        Photography Vendors
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Choose the photography vendor you want for your special day.
                    </p>
                </div>
                {loading ? (
                    <p className="mt-12 text-center text-gray-500">
                        Loading photography vendors...
                    </p>
                ) : error ? (
                    <p className="mt-12 text-center text-red-600">
                        {error}
                    </p>
                ) : vendors.length === 0 ? (
                    <div className="mt-12 rounded-2xl border border-[#E8E1CC] bg-white p-10 text-center">
                        <h2 className="text-xl font-semibold text-[#2B2B2B]">
                            No Photography Vendors Available
                        </h2>
                        <p className="mt-3 text-gray-500">
                            Approved photography vendors will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {vendors.map((vendor) => {
                            const vendorName = vendor.businessName;
                            const isSelected = selections.photography === vendorName;

                            return (
                                <React.Fragment key={vendor.id}>
                                <div
                                  key={vendor.id}
                                  className="overflow-hidden rounded-2xl border border-[#E8E1CC] bg-white shadow-sm">
                                    <img src={vendor.portfolioImage || "/images/photography.png"} alt={vendorName} className="h-56 w-full object-contain bg-[#FAF9F6]" />
                                </div>
                                <div className="p-5">
                                    <h2 className="text-xl font-semibold text-[#2B2B2B]">
                                        {vendorName}
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-500">
                                        📍 {vendor.location}
                                    </p>
                                    {(vendor.portfolioDescription || vendor.description) && (
                                        <p className="mt-3 text-sm text-gray-600">
                                            {vendor.portfolioDescription || vendor.description}
                                        </p>
                                    )}
                                    <button 
                                       onClick={() => handleSelect(vendorName)}
                                       className={`mt-5 w-full rounded-full border py-2 ${
                                        isSelected
                                           ? "border-[#C9A227] bg-[#C9A227] text-white"
                                           : "border-[#C9A227] text-[#C9A227] hover:bg-[#FAF9F6]"
                                       }`}>
                                        {isSelected
                                          ?"Deselect"
                                          :"Select Vendor"}
                                    </button>
                                </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                )}
                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-6">
                    <h2 className="text-xl font-semibold text-[#2B2B2B]">
                        Selected Photography Vendors
                    </h2>
                    {selections.photography === "" ? (
                        <p className="mt-3 text-gray-500">
                            You have not selected a photography vendor yet.
                        </p>
                    ) : (
                        <div className="mt-4 flex flex-wrap gap-3">
                            <span className="rounded-full bg-[#FAF9F6] px-4 py-2 text-sm text-[#2B2B2B]">
                                {selections.photography}
                            </span>
                        </div>
                    )}
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <button
                      onClick={() => router.push("/find-vendors")}
                      className="w-full rounded-full border border-[#C9A227] px-6 py-3 font-medium text-[#C9A227] hover:bg-[#FAF9F6]">
                        Back to Find Vendors
                    </button>
                    <button
                      onClick={() => router.push("/event-details")}
                      disabled={selections.photography === ""}
                      className="w-full rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50">
                        Continue to Event Details
                    </button>
                </div>
        
            </div>
        </main>
    );
}