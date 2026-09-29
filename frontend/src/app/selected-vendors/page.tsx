"use client";

import { useRouter } from "next/navigation";
import { useVendorSelection } from "@/components/VendorSelectionContext";

export default function SelectedVendorsPage() {
    const router = useRouter();
    const { selections }= useVendorSelection();

    const categories =[
        {
            key: "photography",
            name: "Photography",
        },
        {
            key: "videography",
            name: "Videography",
        },
        {
            key: "decoration",
            name: "Decoration",
        },
        {
            key: "venue",
            name: "Venue",
        },
        {
            key: "makeup",
            name: "Makeup & Hair",
        },
        {
            key: "dress",
            name: "Wedding Dresses",
        },
        {
            key: "music",
            name: "Music & DJ",
        },
        {
            key: "cake",
            name: "Cakes",
        },
    ];
    const selectedCount =Object.values(selections).filter(
        (vendor) => vendor !== ""
    ).length;

    return (
        <main className="min-h-screen bg-[#FAF9F6] px-8 py-16">
            <div className="mx-auto max-w-5xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Your Wedding Plan
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Selected Vendors
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Review the vendors you have selected before continuing to your event details.
                    </p>
                </div>
                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {categories.map((category) => {
                        const vendor = 
                        selections[
                            category.key as keyof typeof selections
                        ];
                        return (
                            <div 
                               key={category.key}
                               className="rounded-2xl border border-[#E8E1CC] bg-white p-6">
                                <p className="text-sm font-medium text-[#C9A227]">
                                    {category.name}
                                </p>
                                {vendor ? (
                                    <div className="mt-3 flex items-center justify-between gap-4">
                                        <p className="font-semibold text-[#2B2B2B]">
                                            {vendor}
                                        </p>
                                        <span className="rounded-full bg-[#FAF9F6] px-3 py-1 text-xs text-[#C9a227]">
                                            Selected
                                        </span>
                                    </div>
                                ) : (
                                    <p className="mt-3 text-sm text-gray-500">
                                        Not selected
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="mt-8 rounded-2xl border-[#E8E1CC] bg-white p-6 text-center">
                    <p className="text-gray-500">
                        You have selected
                    </p>
                    <p className="mt-2 text-3xl font-bold text-[#C9A227]">
                        {selectedCount}
                    </p>
                    <p className="mt-1 text-gray-500">
                        {selectedCount === 1
                           ?"vendor"
                           :"vendors"}
                    </p>
                </div>
                <button 
                   onClick={() => router.push("/event-details")}
                   disabled={selectedCount === 0}
                   className="mt-8 w-full rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50">
                    Continue to Event Details
                </button>
            </div>
        </main>
    );
}