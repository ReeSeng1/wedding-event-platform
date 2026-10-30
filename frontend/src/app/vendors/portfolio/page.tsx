"use client";

import { useEffect,useState } from "react";
import { clearVendor} from "@/lib/vendorStorage";

export default function VendorPortfolioPage() {
    const [portfolioTitle, setPortfolioTitle] = useState("");
    const [portfolioDescription, setPortfolioDescription] = useState("");
    const [portfolioImage, setPortfolioImage] = useState("");

    useEffect(() => {
        async function loadPortfolio() {
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
                    alert(data.message || "Unable to load portfolio.");
                    return;
                }
                setPortfolioTitle(data.vendor.portfolioTitle || "");
                setPortfolioDescription(data.vendor.portfolioDescription || "");
                setPortfolioImage(data.vendor.portfolioImage || "");
            } catch (error) {
                console.error("Failed to load portfolio:", error);
                alert("Unable to connect to the server. Please try again.");
            }
        }
        loadPortfolio();
    }, []);

    async function handleSaveProject() {
        const token = localStorage.getItem("everafterVendorToken");
        if (!token) {
            clearVendor();
            window.location.href = "/vendors/login";
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/api/vendors/me/portfolio", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    portfolioTitle,
                    portfolioDescription,
                    portfolioImage,
                }),
            });
            const data = await response.json();

            if (response.status === 401 || response.status === 403) {
                clearVendor();
                window.location.href = "/vendors/login";
                return;
            }
            if (!response.ok) {
                alert(data.message || "Unable to save portfolio.");
                return;
            }
            setPortfolioTitle(data.vendor.portfolioTitle || "");
            setPortfolioDescription(data.vendor.portfolioDescription || "");
            setPortfolioImage(data.vendor.portfolioImage || "");

            alert("Your portfolio has been saved successfully!");
        } catch (error) {
            console.error("Failed to save potfolio:", error);
            alert("Unable to connect to the server. Please try again.");
        }
    }

    return (
        <main className="min-h-screen bg-[#F9F7F0] px-6 py-16">
            <div className="mx-auto max-w-3xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Vendor Portfolio
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        My Portfolio
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-gray-600">
                        Show clients some of your previous work and projects.
                    </p>
                </div>
                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 shadow-sm">
                    <div>
                        <label className="text-sm font-medium text-[#2B2B2B]">
                            Project Title
                        </label>
                        <input 
                            type="text"
                            value={portfolioTitle}
                            onChange={(e) => setPortfolioTitle(e.target.value)}
                            placeholder="Enter your project title"
                            className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                    </div>
                    <div className="mt-5">
                        <label className="text-sm font-medium text-[#2B2B2B]">
                            Project Description
                        </label>
                        <textarea 
                           value={portfolioDescription}
                           onChange={(e) => setPortfolioDescription(e.target.value)}
                           placeholder="Describe this project"
                           rows={5}
                           className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]"/>
                    </div>
                    <div className="mt-5">
                        <label className="text-sm font-medium text-[#2B2B2B]">
                            Project Image
                        </label>
                        <input 
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (!file) {
                                    return;
                                }
                                const reader = new FileReader();
                                reader.onload = () => {
                                    setPortfolioImage(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            }}
                            className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                            {portfolioImage && (
                                <div className="mt-4">
                                    <p className="mb-2 text-sm font-medium text-[#2B2B2B]">
                                        Project Image Preview
                                    </p>
                                    <img src={portfolioImage} alt="Project preview" className="h-64 w-full object-cover" />
                                </div>
                            )}
                    </div>
                    <button
                        type="button"
                        onClick={handleSaveProject}
                        className={`mt-8 w-full rounded-full px-6 py-3 font-medium text-white ${
                            portfolioTitle.trim() !== "" &&
                            portfolioDescription.trim() !== "" &&
                            portfolioImage.trim() !== ""
                               ? "bg-[#C9A227] hover:bg-[#B08D20]"
                               : "bg-gray-300"
                        }`}>
                        Save Project
                    </button>
                </div>
            </div>
        </main>
    );
}