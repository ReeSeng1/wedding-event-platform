"use client";

import { useState } from "react";

const venueVendors =[
    {
        id: "1",
        name: "Grand Garden Venue",
        location: "Addis Ababa",
        image: "/images/vendors/grand-garden-venue.png"
    },
    {
        id: "2",
        name: "Royal Palace Venue",
        location: "Addis Ababa",
        image: "/images/vendors/royal-palace-venue.png",
    },
    {
        id: "3",
        name: "Green Valley Events Venue",
        location: "Addis Ababa",
        image: "/images/vendors/green-valley-events-venue.png",
    },
];

export default function VenuePage() {
    const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

    function handleSelect(vendorName: string) {
        setSelectedVendors((current) => 
           current.includes(vendorName) ? [] : [vendorName]
            );
    }

    return (
        <main className="min-h-screen bg-[#FAF9F6] px-8 py-16">
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
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {venueVendors.map((vendor) => (
                        <div 
                           key={vendor.id}
                           className="overflow-hidden rounded-2xl border border-[#E8E1CC] bg-white shadow-sm">
                            <img src={vendor.image} alt={vendor.name} className="h-56 w-full object-cover"/>
                            <div className="p-5">
                                <h2 className="text-xl font-semibold text-[#2B2B2B]">
                                    {vendor.name}
                                </h2>
                                <p className="mt-2 text-sm text-gray-500">
                                    📍 {vendor.location}
                                </p>
                                <button 
                                   onClick={() => handleSelect(vendor.name)}
                                   className={`mt-5 w-full rounded-full border py-2 ${
                                    selectedVendors.includes(vendor.name)
                                     ? "border-[#C9A227] bg-[#C9A227] text-white"
                                     : "border-[#C9A227] text-[#C9A227] hover:bg-[#FAF9F6]"
                                   }`}>
                                    {selectedVendors.includes(vendor.name)
                                     ? "Deselect"
                                     : "Select Vendor"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-6">
                    <h2 className="text-xl font-semibold text-[#2B2B2B]">
                        Selected Venue
                    </h2>
                    {selectedVendors.length === 0 ? (
                        <p className="mt-3 text-gray-500">
                            You have not selected a venue yet.
                        </p>
                    ) : (
                        <div className="mt-4 flex flex-wrap gap-3">
                            {selectedVendors.map((vendor) => (
                                <span 
                                   key={vendor}
                                   className="rounded-full bg-[#FAF9F6] px-4 py-2 text-sm text-[#2B2B2B]">
                                    {vendor}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <button 
                   disabled={selectedVendors.length === 0}
                   className="mt-8 w-full rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50">
                    Continue to Event Details
                </button>
            </div>
        </main>
    );
}