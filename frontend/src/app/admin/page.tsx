"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRequests } from "@/lib/requestStorage";
import { VendorRequest } from "@/types/vendor";

export default function AdminDashboardPage() {
    const router = useRouter();

    const [requests, setRequests] = useState<VendorRequest[]>([]);

    useEffect(() => {
        setRequests(getRequests());
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
            </div>
        </main>
    );
}