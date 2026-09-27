"use client";

import { useRouter } from "next/navigation";
import { useVendorSelection } from "@/components/VendorSelectionContext";

const photographyVendors =[
    {
        id: "1",
        name: "Luna Photography",
        location: "Addis Ababa",
        image: "/images/vendors/luna-photography.png"
    },
    {
        id: "2",
        name: "Ethiopian Moments Photography",
        location: "Addis Ababa",
        image: "/images/vendors/ethiopian-moments.png",
    },
    {
        id: "3",
        name: "Golden Frame Photography",
        location: "Addis Ababa",
        image: "/images/vendors/golden-frame.png",
    },
];

export default function PhotographyPage() {

    const router = useRouter();
    const { selections, selectVendor, removeVendor} = useVendorSelection();

    function handleSelect(vendorName: string) {
        if (selections.photography === vendorName) {
            removeVendor("photography");
        } else {
            selectVendor("photography", vendorName);
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
                        Photography Vendors
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Choose the photography vendor you want for your special day.
                    </p>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {photographyVendors.map((vendor) => (
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
                                    selections.photography ===vendor.name
                                     ? "border-[#C9A227] bg-[#C9A227] text-white"
                                     : "border-[#C9A227] text-[#C9A227] hover:bg-[#FAF9F6]"
                                   }`}>
                                    {selections.photography === vendor.name
                                     ? "Deselect"
                                     : "Select Vendor"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
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
                            
                                <span 
                                  
                                   className="rounded-full bg-[#FAF9F6] px-4 py-2 text-sm text-[#2B2B2B]">
                                    {selections.photography}
                                </span>
                        </div>
                    )}
                </div>
                <button 
                   onClick={() => router.push("/event-details")}
                   disabled={selections.photography === ""}
                   className="mt-8 w-full rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50">
                    Continue to Event Details
                </button>
            </div>
        </main>
    );
}