"use client";

import { useEffect,useState } from "react";
import { getVendor, saveVendor} from "@/lib/vendorStorage";

export default function VendorSettingsPage() {
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const vendor = getVendor();

        if (vendor) {
            setEmail(vendor.email);
        }
    }, []);

    function handleSaveSettings() {
        const vendor = getVendor();

        if (!vendor) {
            return;
        }
        saveVendor({
            ...vendor,
            email,
        });
        console.log("Vendor settings saved");
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
                           type="text"
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
                               type="text"
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
                               type="text"
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
                               type="text"
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