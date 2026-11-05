"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Vendor {
    id: number;
    businessName: string;
    ownerName: string;
    email: string;
    phoneNumber: string;
    category: string;
    location: string;
    description: string;
    serviceName: string;
    serviceDescription: string;
    servicePrice: string;
    portfolioTitle: string;
    portfolioDescription: string;
    portfolioImage: string;
    status: string;
}

export default function AdminVendorPage() {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [showDetails, setShowDetails] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingVendorId, setUpdatingVendorId] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchVendors() {
            const token = localStorage.getItem("everafterAdminToken");

            if (!token) {
                router.replace("/admin/login");
                return;
            }
            try {
                const response = await fetch("http://localhost:5000/api/admin/vendors", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    cache: "no-store",
                });
                const data = await response.json();

                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem("everafterAdminToken");
                    router.replace("/admin/login");
                    return;
                }
                if (!response.ok) {
                    throw new Error(data.message || "Unable to load vendors.");
                }
                setVendors(data.vendors);
            } catch (error) {
                console.error("Failed to fetch vendors:", error);
                setError("Unable to load vendors. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        fetchVendors();
    }, [router]);

    async function handleStatusChange(
        vendorId: number,
        status: "Approved" | "Rejected"
    ) {
        const token = localStorage.getItem("everafterAdminToken");
        if (!token) {
            router.replace("/admin/login");
            return;
        }
        setUpdatingVendorId(vendorId);
        setError("");

        try {
            const response = await fetch(`http://localhost:5000/api/admin/vendors/${vendorId}/status`, {
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
                throw new Error(data.message || "Unable to update vendor status.");
            }
            setVendors((previousVendors) =>
              previousVendors.map((vendor) =>
                 vendor.id === vendorId
                    ? { ...vendor, status: data.vendor.status }
                    : vendor));
        } catch (error) {
            console.error("Failed to update vendor status:", error);
            setError(
                error instanceof Error
                   ?error.message
                   : "Unable to update vendor status."
            );
        } finally {
            setUpdatingVendorId(null);
        }
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
                {error && (
                    <p className="mt-8 rounded-xl bg-red-50 p-4 text-center text-red-600">
                        {error}
                    </p>
                )}
                {loading ? (
                    <p className="mt-10 text-center text-gray-500">
                        Loading registered vendors...
                    </p>
                ) : vendors.length === 0 ? (
                    <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 text-center shadow-sm">
                        <h2 className="text-xl font-bold text-[#2B2B2B]">
                            No Vendor Yet
                        </h2>
                        <p className="mt-2 text-gray-600">
                                Registered vendors will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="mt-10 space-y-8">
                        {vendors.map((vendor) => (
                            <div
                               key={vendor.id}
                               className="rounded-2xl border border-[#E8E1CC] bg-white p-8 shadow-sm">
                                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                                    <div className="w-full">
                                        <p className="text-sm font-semibold text-[#C9A227]">
                                            Registered Vendor
                                        </p>
                                        <h2 className="mt-2 text-2xl font-bold text-[#2B2B2B]">
                                            {vendor.businessName}
                                        </h2>
                                        <p className="mt-3 text-sm font-semibold">
                                            Status:{" "}
                                            <span className= {
                                               vendor.status === "Approved"
                                                  ? "text-green-600"
                                                  : vendor.status === "Rejected"
                                                  ? "text-red-600"
                                                  : "text-yellow-600"}>
                                                     {vendor.status}
                                            </span>
                                        </p>
                                        <div className="mt-4 space-y-2 text-gray-600">
                                            <p>
                                                <span className="font-medium text-[#2B2B2B]">Owner:</span>{" "}
                                                {vendor.ownerName}
                                            </p>
                                            <p>
                                                <span className="font-medium text-[#2B2B2B]">Email:</span>{" "}
                                                {vendor.email}
                                            </p>
                                            <p>
                                                <span className="font-medium text-[#2B2B2B]">Phone:</span>{" "}
                                                {vendor.phoneNumber}
                                            </p>
                                            <p>
                                                <span className="font-medium text-[#2B2B2B]">Category:</span>{" "}
                                                {vendor.category}
                                            </p>
                                            <p>
                                                <span className="font-medium text-[#2B2B2B]">Location:</span>{" "}
                                                {vendor.location || "Not provided"}
                                            </p>
                                            <p>
                                                <span className="font-medium text-[#2B2B2B]">Services:</span>{" "}
                                                {vendor.serviceName || "Not provided"}
                                            </p>
                                            <p>
                                                <span className="font-medium text-[#2B2B2B]">Services Description:</span>{" "}
                                                {vendor.serviceDescription || "Not provided"}
                                            </p>
                                            <p>
                                                <span className="font-medium text-[#2B2B2B]">Service Price:</span>{" "}
                                                {vendor.servicePrice || "Not provided"}
                                            </p>
                                        </div>
                                        <div className="mt-6 border-t border-[#E8E1CC] pt-6">
                                            <h3 className="text-lg font-semibold text-[#2B2B2B]">
                                                Portfolio
                                            </h3>
                                            <p className="mt-3 text-gray-600">
                                                <span className="font-medium text-[#2B2B2B]">Project:</span>{" "}
                                                {vendor.portfolioTitle || "Not provided"}
                                            </p>
                                            <p className="mt-2 text-gray-600">
                                                <span className="font-medium text-[#2B2B2B]">Description:</span>{" "}
                                                {vendor.portfolioDescription || "Not provided"}
                                            </p>
                                            {vendor.portfolioImage && (
                                                <div className="mt-4 overflow-hidden rounded-xl border border-[#E8E1CC]">
                                                    <img src={vendor.portfolioImage} alt={vendor.portfolioTitle || "Vendor portfolio"} className="h-64 w-full object-cover" />
                                                </div>
                                            )}
                                            <button
                                               type="button"
                                               onClick={() =>
                                                 setShowDetails(
                                                    showDetails === vendor.id
                                                        ?null
                                                        :vendor.id
                                                 )
                                               }className="mt-6 rounded-full border border-[#C9A227] px-6 py-3 font-medium text-[#C9A227] hover:bg-[#FAF9F6]">
                                                 {showDetails === vendor.id
                                                    ? "Hide Vendor Details"
                                                    : "View Vendor Details"}
                                            </button>
                                            {showDetails === vendor.id && (
                                                <div className="mt-6 rounded-2xl border border-[#E8E1CC] bg-[#F9F7F0] p-6">
                                                    <h3 className="text-lg font-semibold text-[#2B2B2B]">
                                                        Vendor Details
                                                    </h3>
                                                    <div className="mt-4 space-y-3 text-gray-600">
                                                        <p>Business Name: {vendor.businessName}</p>
                                                        <p>Owner Name:{vendor.ownerName}</p>
                                                        <p>Email:{vendor.email}</p>
                                                        <p>Phone:{vendor.phoneNumber}</p>
                                                        <p>Category:{vendor.category}</p>
                                                        <p>Location:{vendor.location || "Not provided"}</p>
                                                        <p>Description:{vendor.description || "Not provided"}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {vendor.status === "Pending" && (
                                        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                                            <button
                                              type="button"
                                              onClick={() => handleStatusChange(vendor.id, "Approved")}
                                              disabled={updatingVendorId !== null}
                                              className="rounded-full bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700 disabled:opacity-50">
                                                {updatingVendorId === vendor.id
                                                    ? "Updating..."
                                                    : "Approve Vendor"}
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => handleStatusChange(vendor.id, "Rejected")}
                                              disabled={updatingVendorId !== null}
                                              className="rounded-full bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700 disabled:opacity-50">
                                                Reject Vendor
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}