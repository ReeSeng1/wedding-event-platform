"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ClientRequest {
    id: string;
    clientName: string;
    phoneNumber: string;
    eventType: string;
    eventDate: string;
    eventLocation: string;
    guestCount: string;
    budget: string;
    message: string;
    status: "Pending" | "Approved" | "Rejected";
    createdAt: string;
    SelectedVendors: {
        category: string;
        vendor: {
            id: number;
            businessName: string;
            category: string;
            location: string;
        };
    }[];
}

export default function AdminRequestPage() {
    const router = useRouter();

    const [requests, setRequests] = useState<ClientRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingRequestId, setUpdatingRequestId] = useState<string | null>(null);
    useEffect(() => {
        async function fetchRequests() {
            const token = localStorage.getItem("everafterAdminToken");

            if (!token) {
                router.replace("/admin/login");
                return;
            }
            try {
                const response = await fetch("http://localhost:5000/api/admin/requests", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    cache: "no-store",
                });
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem("everafterAdminToken");
                    router.replace("/admin/login");
                    return;
                }
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Unable to load client requests.");
                }
                setRequests(data.requests || []);
            } catch (error) {
                console.error("Failed to fetch client requests:", error);

                setError(
                    error instanceof Error
                       ? error.message
                       : "Unable to load client requests."
                );
            } finally {
                setLoading(false);
            }
        }
        fetchRequests();
    }, [router]);

    async function handleStatusChange(
        requestId: string,
        status: "Approved" | "Rejected"
    ) {
        const token = localStorage.getItem("everafterAdminToken");

        if (!token) {
            router.replace("/admin/login");
            return;
        }
        setUpdatingRequestId(requestId);
        setError("");

        try {
            const response = await fetch(`http://localhost:5000/api/admin/requests/${requestId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });
            const data = await response.json();

            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem("everafterAdminToken");
                router.replace("/admin/login");
                return;
            }
            if (!response.ok) {
                throw new Error(data.message || "Unable to update booking status.");
            }
            setRequests((previousRequests) =>
              previousRequests.map((request) =>
                 request.id === requestId
                   ? { ...request, status: data.request.status }
                   : request));
        } catch (error) {
            console.error("Failed to update booking status:", error);

            setError(
                error instanceof Error
                   ? error.message
                   : "Unable to update booking status."
            );
        } finally {
            setUpdatingRequestId(null);
        }
    }

    return (
        <main className="min-h-screen bg-[#F9F7F0] px-6 py-16">
            <div className="mx-auto max-w-5xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Admin Panel
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Client Requests
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-gray-600">
                        Review client requests and manage vendor availability.
                    </p>
                </div>
                {error && (
                    <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-700">
                        {error}
                    </div>
                )}
                {loading ? (
                    <div className="mt-10 rounded-2xl bg-white p-8 text-center shadow-sm">
                        <p className="text-gray-600">
                            Loading client requests...
                        </p>
                    </div>
                ) : requests.length === 0 ? (
                    <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 text-center shadow-sm">
                       <h2 className="text-xl font-bold text-[#2B2B2B]">
                           No Requests Yet
                       </h2>
                       <p className="mt-2 text-gray-600">
                           Client booking requests will appear here.
                       </p>
                </div>
                ) : (
                    <div className="mt-10 space-y-6">
                        {requests.map((request) => (
                            <div
                              key={request.id}
                              className="rounded-2xl border border-[#E8E1CC] bg-white p-8 shadow-sm">
                                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-[#C9A227]">
                                            ClientBooking Request 
                                        </p>
                                        <h2 className="mt-2 text-2xl font-bold text-[#2B2B2B]">
                                            {request.clientName}
                                        </h2>
                                        <p className="mt-2 break-all text-xs text-gray-400">
                                            Booking Reference: {request.id}
                                        </p>
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
                                    <div 
                                       className={`rounded-full px-5 py-2 text-sm font-medium ${
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
                                       Selected Vendors
                                    </p>
                                    <div className="mt-3 space-y-2">
                                        {request.SelectedVendors.map((selected) =>(
                                            <div
                                               key={`${request.id}-${selected.vendor.id}`}
                                               className="rounded-lg bg-[#FAF9F6] p-3">
                                                <p className="font-medium text-[#2B2B2B]">
                                                    {selected.vendor.businessName}
                                                </p>
                                                <p className="text-sm capitalize text-gray-500">
                                                    {selected.category} . {selected.vendor.location}
                                                </p>
                                            </div>        
                                        ))}  
                                    </div>
                                </div>
                                <div className="mt-6 border-t borde-[#E8E1CC] pt-6">
                                    <p className="text-sm font-medium text-[#2B2B2B]">
                                        Client Message
                                    </p>
                                    <p className="mt-2 text-gray-600">
                                        {request.message || "No message"}
                                    </p>
                                </div>
                                {request.status === "Pending" && (
                                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                        <button
                                          type="button"
                                          disabled={updatingRequestId === request.id}
                                          onClick={() =>
                                            handleStatusChange(request.id, "Approved")
                                          }
                                          className="rounded-full bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50">
                                            {updatingRequestId === request.id
                                               ? "Updating..."
                                               : "Approve"}
                                        </button>
                                        <button
                                          type="button"
                                          disabled={updatingRequestId === request.id}
                                          onClick={() =>
                                            handleStatusChange(request.id, "Rejected")
                                          }
                                          className="rounded-full bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50">
                                            {updatingRequestId === request.id
                                              ? "Updating..."
                                              : "Reject"}
                                        </button>
                                    </div>
                                )}
                                </div>
                            ))}
                       </div>
                     )}
            </div>
        </main>
    );
}