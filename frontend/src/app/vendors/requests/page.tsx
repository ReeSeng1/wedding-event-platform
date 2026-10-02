"use client";

import { useEffect, useState } from "react";
import { getVendor } from "@/lib/vendorStorage";
import { VendorRequest } from "@/types/vendor";

export default function VendorRequestsPage() {
    const [requests, setRequests] = useState<VendorRequest[]>([]);

    useEffect(() => {
        const vendor =getVendor();

        if (vendor) {
            setRequests(vendor.requests || []);
        }
    }, []);
    return (
        <main className="min-h-screen bg-[#F9F7F0] px-6 py-16">
            <div className="mx-auto max-w-5xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Client Requests
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        My Requests
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-gray-600">
                        View requests from clients who are interested in your services.
                    </p>
                </div>
                {requests.length === 0 && (
                    <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 text-center shadow-sm">
                        <h2 className="text-xl font-bold text-[#2B2B2B]">
                            No Client Requests
                        </h2>
                        <p className="mt-2 text-gray-600">
                            You don't have any client requests yet.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}