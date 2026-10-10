"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F9F7F0] px-6 py-12">
            <div className="w-full max-w-md rounded-3xl border border-[#E8E1CC] bg-white p-8 shadow-sm">
                <h1 className="text-3xl font-bold text-[#C9A227]">
                    EverAfter
                </h1>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                    Admin Panel
                </p>
                <h2 className="mt-3 text-3xl font-bold text-[#2B2B2B]">
                    Welcome Back
                </h2>
                <p className="mt-3 text-gray-600">
                    Sign in to manage your platform
                </p>
                <form onSubmit={handleLogin} className="mt-8 space-y-5">
                    <div>
                        <label 
                            htmlFor="email"
                            className="mb-2 block font-medium text-[#2B2B2B]">
                            Admin Email
                        </label>
                        <input 
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter your admin email"
                            required
                            className="w-full rounded-xl border border-[#E8E1CC] px-4 py-3 outline-none focus:border-[#C9A227]" />
                    </div>
                    <div>
                        <label 
                            htmlFor="password"
                            className="mb-2 block font-medium text-[#2B2B2B]">
                            Password
                        </label>
                        <input 
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full rounded-xl border border-[#E8E1CC] px-4 py-3 outline-none focus:border-[#C9A227]" />
                    </div>
                    <button
                       type="submit"
                       className="w-full rounded-full bg-[#C9A227] px-6 py-3 font-semibold text-white transition hover:bg-[#B08D20]">
                        Log In
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-500">
                    Authorized administrators only.
                </p>
            </div>
        </main>
    );
}