"use client";

import { useEffect, useState } from "react";
import { getVendor } from "@/lib/vendorStorage";
import { Vendor } from "@/types/vendor";

export default function AdminVendorPage() {
    const [vendor, setVendor] = useState<Vendor | null>(null);

    useEffect(() => {
        setVendor(getVendor());
    }, []);

    return (
        <main className="min-h-screen bg-[#F9F7F0] px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Admin Panel
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Manage Vendors
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-gray-600">
                        View and manage registered wedding vendors.
                    </p>
                </div>
                {!vendor ? (
                    <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 text-center shadow-sm">
                        <h2 className="text-xl font-bold text-[#2B2B2B]">
                            No Vendors Yet
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Registered vendors will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 text-center shadow-sm">
                        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                            <div>
                                <p className="text-sm font-semibold text-[#C9A227]">
                                    Registered Vendor
                                </p>
                                <h2 className="mt-2 text-2xl font-bold text-[#2B2B2B]">
                                    {vendor.businessName}
                                </h2>
                                <div className="mt-4 space-y-2 text-gray-600">
                                    <p>
                                        <span className="font-medium text-[#2B2B2B]">
                                            Owner:
                                        </span>{" "}
                                        {vendor.ownerName}
                                    </p>
                                    <p>
                                        <span className="font-medium text-[#2B2B2B]">
                                            Email:
                                        </span>{" "}
                                        {vendor.email}
                                    </p>
                                    <p>
                                        <span className="font-medium text-[#2B2B2B]">
                                            Phone:
                                        </span>{" "}
                                        {vendor.phoneNumber}
                                    </p>
                                    <p>
                                        <span className="font-medium text-[#2B2B2B]">
                                            Category:
                                        </span>{" "}
                                        {vendor.category}
                                    </p>
                                    <p>
                                        <span className="font-medium text-[#2B2B2B]">
                                            Location:
                                        </span>{" "}
                                        {vendor.location || "Not provided"}
                                    </p>
                                    <p>
                                        <span className="font-medium text-[#2B2B2B]">
                                            Services:
                                        </span>{" "}
                                        {vendor.serviceName || "Not provided"}
                                    </p>
                                    <p>
                                        <span className="font-medium text-[#2B2B2B]">
                                            Services Description:
                                        </span>{" "}
                                        {vendor.serviceDescription || "Not provided"}
                                    </p>
                                    <p>
                                        <span className="font-medium text-[#2B2B2B]">
                                            Service Price:
                                        </span>{" "}
                                        {vendor.servicePrice || "Not provided"}
                                    </p>
                                </div>
                                <div className="mt-6 border-t border-[#E8E1CC] pt-6">
                                    <h3 className="text-lg font-semibold text-[#2B2B2B]">
                                        Portfolio
                                    </h3>
                                    <p className="mt-3 text-gray-600">
                                        <span className="font-mediu  text-[#2B2B2B]">
                                            Project:
                                        </span>{" "}
                                        {vendor.portfolioTitle || "Not provided"}
                                    </p>
                                    <p className="mt-2 text-gray-600">
                                        <span className="font-medium text-[#2B2B2B]">
                                            Description:
                                        </span>{" "}
                                        {vendor.portfolioDescription || "Not provided"}
                                    </p>
                                    {vendor.portfolioImage && (
                                        <div className="mt-4 overflow-hidden rounded-xl border border-[#E8E1CC]">
                                            <img 
                                               src={vendor.portfolioImage} 
                                               alt={vendor.portfolioTitle || "Vendor portfolio"}
                                               className="h-64 w-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="rounded-full bg-[#E8E1CC] px-5 py-2 text-sm font-medium text-[#2B2B2B]">
                                Registered
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}