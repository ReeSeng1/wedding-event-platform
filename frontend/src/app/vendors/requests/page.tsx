"use client";

import { useEffect, useState } from "react";
import { getVendor } from "@/lib/vendorStorage";
import { VendorRequest } from "@/types/vendor";

export default function VendorRequestsPage() {
    const [requests, setRequests] = useState<VendorRequest[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<VendorRequest | null>(null);

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
                {requests.map((request, index) => (
                    <div
                      key={index}
                      className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 shadow-sm">
                        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                            <div>
                                <p className="text-sm font-semibold text-[#C9A227]">
                                    New Client Request
                                </p>
                                <h2 className="mt-2 text-2xl font-bold text-[#2B2B2B]">
                                    {request.clientName}
                                </h2>
                                <div className="mt-4 space-y-2 text-gray-600">
                                    <p>
                                        <span className="font-medium text-[#2B2B2B]">
                                            Phone:
                                        </span>{" "}
                                        {request.phoneNumber}
                                    </p>
                                    <p>
                                        <span className="font-medium text-[#2B2B2B]">
                                            Event:
                                        </span>{" "}
                                        {request.eventType}
                                    </p>
                                    <p>
                                        <span className="font-medium text-[#2B2B2B]">
                                            Event Date:
                                        </span>{" "}
                                        {request.eventDate}
                                    </p>
                                    <p>
                                        <span className="font-medium text-[#2B2B2B]">
                                            Location:
                                        </span>{" "}
                                        {request.eventLocation || "Not provided"}
                                    </p>
                                    <p>
                                        <span className="font-medium text-[#2B2B2B]">
                                            Guest Count:
                                        </span>{" "}
                                        {request.guestCount || "Not provided"}
                                    </p>
                                    <p>
                                        <span className="font-medium text-[#2B2B2B]">
                                            Budget:
                                        </span>{" "}
                                        {request.budget || "Not provided"}
                                    </p>
                                </div>
                            </div>
                            <div className={`rounded-full px-5 py-2 text-sm font-medium ${
                                request.status === "Pending"
                                  ? "bg-[#E8E1CC] text-[#2B2B2B]"
                                  : request.status === "Approved"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                            }`}>
                                {request.status}
                            </div>
                        </div>
                        <div className="mt-6 border-t border-[#E8E1CC] pt-6">
                            <p className="text-sm font-medium text-[#2B2B2B]">
                                Client Message
                            </p>
                            <p className="mt-2 text-gray-600">
                                {request.message || "No message"}
                            </p>
                        </div>
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <button
                               type="button"
                               onClick={() => {
                                window.location.href = `tel:${request.phoneNumber}`;
                               }}
                               className="rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white hover:bg-[#B08D20]">
                                Contact Client
                            </button>
                            <button
                               type="button"
                               onClick={() => setSelectedRequest(request)}
                               className="rounded-full border border-[#C9A227] px-6 py-3 font-medium text-[#2B2B2B] hover:bg-[#C9A227]">
                                View Details
                            </button>
                            {selectedRequest === request && (
                                <div className="mt-6 rounded-2xl border border-[#E8E1CC] bg-[#F9F7F0] p-6">
                                    <h3 className="text-xl font-bold text-[#2B2B2B]">
                                        Request Details
                                    </h3>
                                    <div className="mt-4 space-y-2 text-gray-600">
                                        <p>
                                            <span className="font-medium text-[#2B2B2B]">
                                                Client Name:
                                            </span>{" "}
                                            {request.clientName}
                                        </p>
                                        <p>
                                            <span className="font-medium text-[#2B2B2B]">
                                                Phone:
                                            </span>{" "}
                                            {request.phoneNumber}
                                        </p>
                                        <p>
                                            <span className="font-medium text-[#2B2B2B]">
                                                Event Type:
                                            </span>{" "}
                                            {request.eventType}
                                        </p>
                                        <p>
                                            <span className="font-medium text-[#2B2B2B]">
                                                Event Date:
                                            </span>{" "}
                                            {request.eventDate}
                                        </p>
                                        <p>
                                            <span className="font-medium text-[#2B2B2B]">
                                                Location:
                                            </span>{" "}
                                            {request.eventLocation || "Not provided"} 
                                        </p>
                                        <p>
                                            <span className="font-medium text-[#2B2B2B]">
                                                Guest Count:
                                            </span>{" "}
                                            {request.guestCount || "Not provided"}
                                        </p>
                                        <p>
                                            <span className="font-medium text-[#2B2B2B]">
                                                Budget:
                                            </span>{" "}
                                            {request.budget || "Not provided"}
                                        </p>
                                        <p>
                                            <span className="font-medium text-[#2B2B2B]">
                                                Message:
                                            </span>{" "}
                                            {request.message || "No message"}
                                        </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => setSelectedRequest(null)}
                                      className="mt-5 rounded-full border border-[#C9A227] px-5 py-2 text-sm font-medium text-[#2B2B2B] hover:bg-[#C9A227]">
                                        Close Details
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}