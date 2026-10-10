"use client";

import { useEffect, useState } from "react";
import { getVendor, saveVendor } from "@/lib/vendorStorage";
import { Vendor } from "@/types/vendor";
import { useRouter } from "next/navigation";

export default function AdminVendorPage() {
    const [vendor, setVendor] = useState<Vendor | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("everafterAdminLoggedIn");
        if (isLoggedIn !== "true") {
            router.replace("/admin/login");
            return;
        }
        setVendor(getVendor());
    }, [router]);

    function handleApprove() {
        if(!vendor) {
            return;
        }
        saveVendor({
            ...vendor,
            status: "Approved",
        });
        setVendor({
            ...vendor,
            status: "Approved",
        });
    }

    function handleReject() {
        if(!vendor) {
            return;
        }
        saveVendor({
            ...vendor,
            status: "Rejected",
        });
        setVendor({
            ...vendor,
            status: "Rejected",
        });
    }

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
                                    <button
                                       type="button"
                                       onClick={() => setShowDetails(!showDetails)}
                                       className="mt-6 rounded-full border border-[#C9A227] px-6 py-3 font-medium text-[#C9A227] hover:bg-[#FAF9F6]">
                                        {showDetails ? "Hide Vendor Details" : "View Vendor Details"}
                                    </button>
                                    {showDetails && (
                                        <div className="mt-6 rounded-2xl border border-[#E8E1CC] bg-[#F9F7F0] p-6">
                                            <h3 className="text-lg font-semibold text-[#2B2B2B]">
                                                Vendor Details
                                            </h3>
                                            <div className="mt-4 space-y-3 text-gray-600">
                                                <p>
                                                    <span className="font-medium text-[#2B2B2B]">
                                                        Business Name:
                                                    </span>{" "}
                                                    {vendor.businessName}
                                                </p>
                                                <p>
                                                    <span className="font-medium text-[#2B2B2B]">
                                                        Owner Name:
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
                                                        Description:
                                                    </span>{" "}
                                                    {vendor.description || "Not provided"}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {vendor.status === "Pending" && (
                            <div className="mt-4 flex-col gap-3 sm:flex-row ">
                                <button
                                   type="button"
                                   onClick={handleApprove}
                                   className="rounded-full bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700">
                                    Approve Vendor
                                </button>
                                <button
                                   type="button"
                                   onClick={handleReject}
                                   className="rounded-full bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700">
                                    Reject Vendor
                                </button>
                            </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}