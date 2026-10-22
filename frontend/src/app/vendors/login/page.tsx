"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VendorLoginPage() {
    const router = useRouter();
    const [email, setEmail] =useState("");
    const [password, setPassword] =useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const loginComplete = 
       email.trim() !== "" &&
       password.trim() !== "";

    async function handleLogin() {
        if (email.trim() === "" || password.trim() === "") {
            setError("Please enter your email and password.");
            return;
        }
        setError("");
        setIsSubmitting(true);
        try {
            const response = await fetch("http://localhost:5000/api/vendors/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                        password,
                    }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                setError(data.message || "Login failed.");
                return;
            }
            localStorage.setItem("everafterVendorToken", data.token);
            localStorage.setItem(
                "everafterVendor",
                JSON.stringify(data.vendor)
            );
            router.push("/vendors/dashboard");
        } catch {
            setError("Unable to connect to the server. Please try again."); 
        } finally {
            setIsSubmitting(false);
        }
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
                        <div className="relative mt-2">
                        <input 
                           type={showPassword ? "text" : "password"}
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder="Enter your password"
                           className="w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                           <button
                             type="button"
                             onClick={() => setShowPassword((previous) => !previous)}
                             aria-label={showPassword ? "Hide password": "Show password"}
                             className="absolute right-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#C9A227]">
                           {showPassword ? (
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="22"
                                 height="22"
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="2"
                                 strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path d="M3 3l18 18"/>
                                <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/>
                                <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.3 4.2 9 7-.3 1.2-1 2.3-1.8 3.2"/>
                                <path d="M6.2 6.2C3.9 7.7 2.4 10 2 12c.7 2.8 4 7 10 7 1.1 0 2.1-.2 3-.5"/>
                              </svg>
                           ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                   <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/>
                                   <circle cx="12" cy="12" r="3"/>
                            </svg>
                           )}
                           </button>
                         </div>
                    </div>
                    {error && (
                        <p className="mt-4 text-sm text-red-600" role="alert">
                            {error}
                        </p>
                    )}
                    <button
                      type="button"
                      onClick={handleLogin}
                      disabled={!loginComplete || isSubmitting}
                      className="mt-8 w-full rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white hover:bg-[#B08D20] disabled:cursor-not-allowed disabled:bg-gray-300">
                        {isSubmitting ? "Logging In...": "Login"}
                    </button>
                </div>
            </div>
        </main>
    );
}