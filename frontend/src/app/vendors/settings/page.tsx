"use client";

import { useEffect,useState } from "react";
import { clearVendor } from "@/lib/vendorStorage";

export default function VendorSettingsPage() {
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        async function loadSettings() {
            const token = localStorage.getItem("everafterVendorToken");
            if (!token) {
                clearVendor();
                window.location.href = "/vendors/login";
                return;
            }
            try {
                const response = await fetch("http://localhost:5000/api/vendors/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 401 || response.status === 403) {
                    clearVendor();
                    window.location.href = "/vendors/login";
                    return;
                }
                const data = await response.json();

                if (!response.ok) {
                    alert(data.message || "Unable to load settings.");
                    return;
                }
                setEmail(data.vendor.email);
            } catch (error) {
                console.error("Failed to load settings:", error);
                alert("Unable to connect to the server. Please try again.");           
            }
        }
        loadSettings();
    }, []);

    async function handleSaveSettings() {
        const token = localStorage.getItem("everafterVendorToken");
        if (!token) {
            clearVendor();
            window.location.href = "/vendors/login";
            return;
        }
        if (newPassword && newPassword !== confirmPassword) {
            alert("New password and confirmation do not match.");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/api/vendors/me/settings", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    email,
                    currentPassword,
                    newPassword,
                    confirmPassword,
                }),
            });
            const data = await response.json();
            if (response.status === 401 || response.status === 403) {
                clearVendor();
                window.location.href = "/vendors/login";
                return;
            }
            if (!response.ok) {
                alert(data.message || "Unable to update settings.");
                return;
            }
            const savedVendor = JSON.parse(
                localStorage.getItem("everafterVendor") || "{}"
            );
            localStorage.setItem(
                "everafterVendor",
                JSON.stringify({
                    ...savedVendor,
                    email: data.vendor.email,
                })
            );
            setEmail(data.vendor.email);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            alert("Your settings have been updated successfully!");
        } catch (error) {
            console.error("Failed to save settings:", error);
            alert("Unable to connect to the server. Please try again.");
        }
    }

    return (
        <main className="min-h-screen bg-[#F9F7F0] px-6 py-16">
            <div className="mx-auto max-w-3xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Account Settings
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Manage Your Account
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-gray-600">
                        Update your account information and password.
                    </p>
                </div>
                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-[#2B2B2B]">
                        Account Information
                    </h2>
                    <div className="mt-5">
                        <label className="text-sm font-medium text-[#2B2B2B]">
                            Email Address
                        </label>
                        <input 
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="Enter your email"
                           className="mt-2 w-full rouded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                    </div>
                    <div className="mt-8 border-t border-[#E8E1CC] pt-8">
                        <h2 className="text-xl font-bold text-[#2B2B2B]">
                            Change Password
                        </h2>
                        <div className="mt-5">
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Current Password
                            </label>
                            <input 
                               type="password"
                               value={currentPassword}
                               onChange={(e) => 
                                setCurrentPassword(e.target.value)
                               }
                               placeholder="Enter your current password"
                               className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                        </div>
                        <div className="mt-5">
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                New Password
                            </label>
                            <input 
                               type="password"
                               value={newPassword}
                               onChange={(e) =>
                                setNewPassword(e.target.value)
                               }
                               placeholder="Enter your new password"
                               className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                        </div>
                        <div className="mt-5">
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Confirm New Password
                            </label>
                            <input 
                               type="password"
                               value={confirmPassword}
                               onChange={(e) =>
                                setConfirmPassword(e.target.value)
                               }
                               placeholder="Confirm your new password"
                               className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                        </div>
                    </div>
                    <button
                       type="button"
                       onClick={handleSaveSettings}
                       className="mt-8 w-full rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white hover:bg-[#B08D20]">
                        Save Settings
                    </button>
                </div>
            </div>
        </main>
    );
}