"use client";

import { useVendorSelection } from "@/components/VendorSelectionContext";

const musicVendors =[
    {
        id: "1",
        name: "Ethiopian Wedding DJs",
        location: "Addis Ababa",
        image: "/images/vendors/ethiopian-wedding-djs.png"
    },
    {
        id: "2",
        name: "Golden Sound Events",
        location: "Addis Ababa",
        image: "/images/vendors/golden-sound-events.png",
    },
    {
        id: "3",
        name: "Royal Beats DJ",
        location: "Addis Ababa",
        image: "/images/vendors/royal-beats.png",
    },
];

export default function MusicPage() {
    const {selections, selectVendor, removeVendor} = useVendorSelection();

    function handleSelect(vendorName: string) {
        if (selections.music === vendorName) {
            removeVendor("music");
        } else {
            selectVendor("venue", vendorName);
        }
    }

    return (
        <main className="min-h-screen bg-[#FAF9F6] px-8 py-16">
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Find Vendors
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Music & DJ Vendors
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Choose one music or DJ vendor to capture your special day.
                    </p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {musicVendors.map((vendor) => (
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
                                    selections.music === vendor.name
                                     ? "border-[#C9A227] bg-[#C9A227] text-white"
                                     : "border-[#C9A227] text-[#C9A227] hover:bg-[#FAF9F6]"
                                   }`}>
                                    {selections.music === vendor.name
                                     ? "Deselect"
                                     : "Select Vendor"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-6">
                    <h2 className="text-xl font-semibold text-[#2B2B2B]">
                        Selected Music & DJ vendor
                    </h2>
                    {selections.music === "" ? (
                        <p className="mt-3 text-gray-500">
                            You have not selected a music or DJ vendor yet.
                        </p>
                    ) : (
                        <div className="mt-4 flex flex-wrap gap-3">
                                <span 
                                   className="rounded-full bg-[#FAF9F6] px-4 py-2 text-sm text-[#2B2B2B]">
                                    {selections.music}
                                </span>
                        </div>
                    )}
                </div>
                <button 
                   disabled={selections.music === ""}
                   className="mt-8 w-full rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50">
                    Continue to Event Details
                </button>
            </div>
        </main>
    );
}