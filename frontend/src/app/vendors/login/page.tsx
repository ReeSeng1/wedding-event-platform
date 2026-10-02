"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VendorLoginPage() {
    const router = useRouter();
    const [email, setEmail] =useState("");
    const [password, setPassword] =useState("");

    const loginComplete = 
       email.trim() !== "" &&
       password.trim() !== "";

    function handleLogin() {
        if (email.trim() === "" || password.trim() === "") {
            return;
        }
        console.log("Vendor login submitted");

        router.push("/vendors/dashboard");
    }   
    return (
        <main className="min-h-screen bg-[#F9F7F0] px-6 py-16">
            <div className="mx-auto max-w-md">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Vendor Login
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Welcome Back
                    </h1>
                    <p className="mx-auto mt-4 text-gray-600">
                        Log in to manage your vendor business.
                    </p>
                </div>
                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 shadow-sm">
                    <div>
                        <label className="text-sm font-medium text-[#2B2B2B]">
                            Email Address
                        </label>
                        <input 
                           type="text"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="Enter your email"
                           className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                    </div>
                    <div className="mt-5">
                        <label className="text-sm font-medium text-[#2B2B2B]">
                            Password
                        </label>
                        <input 
                           type="text"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder="Enter your password"
                           className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                    </div>
                    <button
                      type="button"
                      onClick={handleLogin}
                      disabled={!loginComplete}
                      className="mt-8 w-full rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white hove:bg-[#B08D20] disabled:cursor-not-allowed disabled:bg-gray-300">
                        Login
                    </button>
                </div>
            </div>
        </main>
    );
}