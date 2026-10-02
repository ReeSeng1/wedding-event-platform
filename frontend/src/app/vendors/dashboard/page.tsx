"use client";
import Link from "next/link";

export default function VendorDashboardPage() {
    return (
        <main className="min-h-screen bg-[#F9F7F0] px-6 py-16">
            <div className="mx-auto max-w-6xl">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Vendor Dashboard
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Welcome to Your Dashboard
                    </h1>
                    <p className="mt-4 max-w-2xl text-gray-600">
                        Manage your vendor profile, services, portfolio, and client requests from one place.
                    </p>
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-wide text-[#C9A227]">
                            Profile
                        </p>
                        <h2 className="mt-3 text-xl font-semibold text-[#2B2B2B]">
                            My Profile
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Manage your business information and vendor details.
                        </p>
                        <Link
                           href={"/vendors/profile"}
                           className="mt-4 inline-block rounded-full border border-[#C9A227] px-5 py-2 text-sm font-medium text-[#2B2B2B] hover:bg-[#C9A227]">
                            View Profile
                        </Link>
                    </div>
                    <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-wide text-[#C9A227]">
                            Services
                        </p>
                        <h2 className="mt-3 text-xl font-semibold text-[#2B2B2B]">
                            My Services
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Add and manage the services your business offers.
                        </p>
                        <Link
                           href={"/vendors/services"}
                           className="mt-4 inline-block rounded-full border border-[#C9A227] px-5 py-2 text-sm font-medium text-[#2B2B2B] hover:bg-[#C9A227]">
                            Manage Services
                        </Link>
                    </div>
                    <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-wide text-[#C9A227]">
                            Portfolio
                        </p>
                        <h2 className="mt-3 text-xl font-semibold text-[#2B2B2B]">
                            My Portfolio
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Showcase your previous work and projects.
                        </p>
                        <Link
                           href={"/vendors/portfolio"}
                           className="mt-4 inline-block rounded-full border border-[#C9A227] px-5 py-2 text-sm font-medium text-[#2B2B2B] hover:bg-[#C9A227]">
                            Manage Portfolio
                        </Link>
                    </div>
                    <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-wide text-[#C9A227]">
                            Requests
                        </p>
                        <h2 className="mt-3 text-xl font-semibold text-[#2B2B2B]">
                            Client Requests
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            View requests from clients interested in your services.
                        </p>
                        <Link
                           href={"/vendors/requests"}
                           className="mt-4 inline-block rounded-full border border-[#C9A227] px-5 py-2 text-sm font-medium text-[#2B2B2B] hover:bg-[#C9A227]">
                            View Requests
                        </Link>
                    </div>
                    <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-wide text-[#C9A227]">
                            Account
                        </p>
                        <h2 className="mt-3 text-xl font-semibold text-[#2B2B2B]">
                            Account Settings
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Manage your account information and preferences.
                        </p>
                        <Link
                           href={"/vendors/settings"}
                           className="mt-4 inline-block rounded-full border border-[#C9A227] px-5 py-2 text-sm font-medium text-[#2B2B2B] hover:bg-[#C9A227]">
                            Account Settings
                        </Link>
                    </div>
                    <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-wide text-[#C9A227]">
                            Logout
                        </p>
                        <h2 className="mt-3 text-xl font-semibold text-[#2B2B2B]">
                            Sign Out
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Sign out of your vendor account.
                        </p>
                        <Link
                           href={"/vendors/login"}
                           className="mt-4 inline-block rounded-full border border-[#C9A227] px-5 py-2 text-sm font-medium text-[#2B2B2B] hover:bg-[#C9A227]">
                            Sign Out
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}