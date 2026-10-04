"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRequests } from "@/lib/requestStorage";
import { getVendor } from "@/lib/vendorStorage";
import { VendorRequest, Vendor } from "@/types/vendor";

export default function AdminDashboardPage() {
    const router = useRouter();

    const [requests, setRequests] = useState<VendorRequest[]>([]);

    const [vendor, setVendor] = useState<Vendor | null>(null);

    useEffect(() => {
        setRequests(getRequests());
        setVendor(getVendor());
    }, []);

    const totalRequests = requests.length;

    const PendingRequests = requests.filter(
        (request) => request.status === "Pending"
    ).length;
    const approvedRequests = requests.filter(
        (request) => request.status === "Approved"
    ).length

    const rejectedRequests = requests.filter(
        (request) => request.status === "Rejected"
    ).length;

    return (
        <main className="min-h-screen bg-[#F9F7F0] px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Admin Panel
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Admin Dashboard
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-gray-600">
                        Manage client requests and monitor your wedding vendors.
                    </p>
                </div>
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Total Requests
                        </p>
                        <h2 className="mt-3 text-3xl font-bold text-[#2B2B2B]">
                            {totalRequests}
                        </h2>
                    </div>
                    <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Pending Requests
                        </p>
                        <h2 className="mt-3 text-3xl font-bold text-[#C9A227]">
                            {PendingRequests}
                        </h2>
                    </div>
                    <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Approved Requests
                        </p>
                        <h2 className="mt-3 text-3xl font-bold text-green-600">
                            {approvedRequests}
                        </h2>
                    </div>
                    <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Rejected Requests
                        </p>
                        <h2 className="mt-3 text-3xl font-bold text-red-600">
                            {rejectedRequests}
                        </h2>
                    </div>
                </div>
                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-[#2B2B2B]">
                        Admin Management
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Manage client booking requests from here.
                    </p>
                    <button
                       type="button"
                       onClick={() => router.push("/admin/requests")}
                       className="mt-6 rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white hover:bg-[#B08D20]">
                        View Client Requests
                    </button>
                </div>
                <div className="mt-8 rounded-2xl border border-[#E8E1CC] bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-[#2B2B2B]">
                        Vendor Information
                    </h2>
                    {vendor ? (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-[#2B2B2B]">
                                {vendor.businessName}
                            </h3>
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
                            </div>
                        </div>
                    ) : (
                        <p className="mt-4 text-gray-500">
                            No vendor registered yet.
                        </p>
                    )}
                    </div>
                    <button
                       type="button"
                       onClick={() => router.push("/vendors")}
                       className="mt-6 rounded-full border border-[#C9A227] px-6 py-3 font-medium text-[#C9A227] hover:bg-[#FAF9F6]">
                        Manage Vendor
                    </button>
            </div>
        </main>
    );
}