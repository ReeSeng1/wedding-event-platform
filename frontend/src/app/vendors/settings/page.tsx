"use client";

import { useEffect,useState } from "react";
import { clearVendor } from "@/lib/vendorStorage";

export default function VendorSettingsPage() {
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [deletePassword, setDeletePassword] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

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
    const handleDeleteAccount = async () => {
    if (!deletePassword.trim()) {
        setDeleteError("Please enter your current password.");
        return;
    }

    const confirmed = window.confirm(
        "Are you sure you want to permanently delete your vendor account? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
        setDeleting(true);
        setDeleteError("");

        const token = localStorage.getItem("everafterVendorToken");

        if (!token) {
            clearVendor();
            window.location.href = "/vendors/login";
            return;
        }

        const response = await fetch("http://localhost:5000/api/vendors/me", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                currentPassword: deletePassword,
            }),
        });

        const data = await response.json();

        if (response.status === 401 || response.status === 403) {
            clearVendor();
            window.location.href = "/vendors/login";
            return;
        }

        if (!response.ok) {
            throw new Error(data.message || "Unable to delete your account.");
        }

        clearVendor();
        alert("Your vendor account has been permanently deleted.");
        window.location.href = "/vendors/login";

    } catch (error) {
        setDeleteError(
            error instanceof Error
                ? error.message
                : "Something went wrong."
        );
    } finally {
        setDeleting(false);
    }
};

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
                <div className="mt-8 rounded-xl border border-red-200 bg-white p-6 shadow-sm">
    <h2 className="text-xl font-bold text-red-600">
        Danger Zone
    </h2>

    <p className="mt-2 text-sm text-gray-600">
        Permanently delete your vendor account. Your vendor profile
        and its associated vendor selections will be removed.
        This action cannot be undone.
    </p>

    <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
            Enter your current password to confirm
        </label>

        <input
            type="password"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            placeholder="Current password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
        />
    </div>

    {deleteError && (
        <p className="mt-3 text-sm text-red-600">
            {deleteError}
        </p>
    )}

    <button
        type="button"
        onClick={handleDeleteAccount}
        disabled={deleting}
        className="mt-5 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
        {deleting ? "Deleting Account..." : "Delete My Account"}
    </button>
</div>
            </div>
        </main>
    );
}