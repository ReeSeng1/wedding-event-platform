"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Statistics {
    requests: {
        total: number;
        pending: number;
        approved: number;
        rejected: number;
    };
    vendors: {
        total: number;
        pending: number;
        approved: number;
        rejected: number;
    };
}

export default function AdminDashboardPage() {
    const router = useRouter();
    const [statistics, setStatistics] = useState<Statistics>({
        requests: {
            total: 0,
            pending: 0,
            approved: 0,
            rejected: 0,
        },
        vendors: {
            total: 0,
            pending: 0,
            approved: 0,
            rejected: 0,
        },
    });
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("everafterAdminToken");
        router.replace("/admin/login");
    }

    useEffect(() => {
        async function checkAdminAccess() {
            const token  = localStorage.getItem("everafterAdminToken");
            if (!token) {
                router.replace("/admin/login");
                return;
            }
            try {
                const authResponse = await fetch("http://localhost:5000/api/admin/protected", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!authResponse.ok) {
                    localStorage.removeItem("everafterAdminToken");
                    router.replace("/admin/login");
                    return;
                }
                 const statisticsResponse = await fetch(
                    "http://localhost:5000/api/admin/statistics",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                 if (!statisticsResponse.ok) {
                    throw new Error("Failed to fetch admin statistics.");
                }
                const data = await statisticsResponse.json();

                if (data.success) {
                    setStatistics(data.statistics);
                }
            } catch (error){
                console.error("Unable to verify admin access.");
            } finally {
                setLoading(false);
            }
        }
        checkAdminAccess();
    }, [router]);

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
                <section className="mt-10">
                    <h2 className="mb-6 text-2xl font-bold text-[#2B2B2B]">
                        Client Request Statistics
                    </h2>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Total Requests
                            </p>
                            <h3 className="mt-3 text-3xl font-bold text-[#2B2B2B]">
                                {loading ? "..." : statistics.requests.total}
                            </h3>
                        </div>

                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Pending Requests
                            </p>
                            <h3 className="mt-3 text-3xl font-bold text-[#C9A227]">
                                {loading ? "..." : statistics.requests.pending}
                            </h3>
                        </div>

                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Approved Requests
                            </p>
                            <h3 className="mt-3 text-3xl font-bold text-green-600">
                                {loading ? "..." : statistics.requests.approved}
                            </h3>
                        </div>

                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Rejected Requests
                            </p>
                            <h3 className="mt-3 text-3xl font-bold text-red-600">
                                {loading ? "..." : statistics.requests.rejected}
                            </h3>
                        </div>
                    </div>
                </section>
                <section className="mt-10">
                    <h2 className="mb-6 text-2xl font-bold text-[#2B2B2B]">
                        Vendor Application Statistics
                    </h2>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Total Vendors
                            </p>
                            <h3 className="mt-3 text-3xl font-bold text-[#2B2B2B]">
                                {loading ? "..." : statistics.vendors.total}
                            </h3>
                        </div>

                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Pending Vendors
                            </p>
                            <h3 className="mt-3 text-3xl font-bold text-[#C9A227]">
                                {loading ? "..." : statistics.vendors.pending}
                            </h3>
                        </div>

                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Approved Vendors
                            </p>
                            <h3 className="mt-3 text-3xl font-bold text-green-600">
                                {loading ? "..." : statistics.vendors.approved}
                            </h3>
                        </div>

                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Rejected Vendors
                            </p>
                            <h3 className="mt-3 text-3xl font-bold text-red-600">
                                {loading ? "..." : statistics.vendors.rejected}
                            </h3>
                        </div>
                    </div>
                </section>
                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-[#2B2B2B]">
                        Admin Management
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Manage client booking requests and vendor applications from here.
                    </p>
                    <button
                       type="button"
                       onClick={handleLogout}
                       className="mt-6 rounded-full border border-[#C9A227] px-6 py-3 font-medium text-[#C9A227] transition hover:bg-[#C9A227] hover:text-white">
                        Log Out
                    </button>
                    <button
                       type="button"
                       onClick={() => router.push("/admin/requests")}
                       className="mt-6 rounded-full border border-[#C9A227] px-6 py-3 font-medium text-[#C9A227] transition hover:bg-[#C9A227] hover:text-white">
                        View Client Requests
                    </button>
                    <button
                       type="button"
                       onClick={() => router.push("admin/vendors")}
                       className="mt-6 rounded-full border border-[#C9A227] px-6 py-3 font-medium text-[#C9A227] transition hover:bg-[#C9A227] hover:text-white">
                        Manage Vendors
                    </button>
                </div>
            </div>
        </main>
    );
}