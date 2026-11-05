"use client";

import { useEffect,useState } from "react";
import { clearVendor} from "@/lib/vendorStorage";

export default function VendorPortfolioPage() {
    const [portfolioTitle, setPortfolioTitle] = useState("");
    const [portfolioDescription, setPortfolioDescription] = useState("");
    const [portfolioImage, setPortfolioImage] = useState("");
    const [imageZoom, setImageZoom] = useState(1);

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

    async function createZoomedImage(
        imageData: string,
        zoom: number
    ): Promise<string> {
        if (zoom === 1) {
            return imageData;
        }
        return new Promise((resolve, reject) => {
            const image = new window.Image();
            image.onload = () => {
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                if (!context) {
                    reject(new Error("Unable to process image."));
                    return;
                }
                const width = image.naturalWidth;
                const height = image.naturalHeight;

                const cropWidth = width / zoom;
                const cropHeight = height / zoom;

                const startX = (width - cropWidth) / 2;
                const startY = (height - cropHeight) / 2;

                canvas.width = width;
                canvas.height = height;

                context.drawImage(
                    image,
                    startX,
                    startY,
                    cropWidth,
                    cropHeight,
                    0,
                    0,
                    width,
                    height
                );
                resolve(canvas.toDataURL("image/png"));
            };
            image.onerror = () => reject(new Error("Unable to load image."));
            image.src = imageData;
        });
    }

    async function handleSaveProject() {
        const token = localStorage.getItem("everafterVendorToken");
        if (!token) {
            clearVendor();
            window.location.href = "/vendors/login";
            return;
        }
        try {
            const savedPortfolioImage = await createZoomedImage(
                portfolioImage,
                imageZoom
            );
            const response = await fetch("http://localhost:5000/api/vendors/me/portfolio", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    portfolioTitle,
                    portfolioDescription,
                    portfolioImage: savedPortfolioImage,
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
            setPortfolioImage(data.vendor.portfolioImage || savedPortfolioImage);
            setImageZoom(1);

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
                                    setImageZoom(1);
                                };
                                reader.readAsDataURL(file);
                            }}
                            className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                            {portfolioImage && (
                                <div className="mt-4">
                                    <p className="mb-2 text-sm font-medium text-[#2B2B2B]">
                                        Project Image Preview
                                    </p>
                                    <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-xl bg-[#FAF9F6]">
                                    <img src={portfolioImage} alt="Project preview" className="max-h-full max-w-full object-contain transition-transform duration-150" style={{transform: `scale(${imageZoom})`, }} />
                                    </div>
                                    <div className="mt-4 flex items-center justify-center gap-5">
                                        <button 
                                           type="button"
                                           onClick={() => 
                                            setImageZoom((previous) =>
                                               Math.max(1, Number((previous - 0.1).toFixed(1))))
                                           }
                                           disabled={imageZoom <=1}
                                           className="rounded-full border border-[#C9A227] px-5 py-2 text-xl font-bold text-[#C9A227] disabled:opacity-40">
                                             −
                                        </button>
                                        <span className="min-w-20 text-center text-sm font-medium text-[#2B2B2B]">
                                            {Math.round(imageZoom * 100)}%
                                        </span>
                                        <button
                                           type="button"
                                           onClick={() => 
                                            setImageZoom((previous) =>
                                               Math.min(3, Number((previous + 0.1).toFixed(1))))
                                           }
                                           disabled={imageZoom >=3}
                                           className="rounded-full border border-[#C9A227] px-5 py-2 text-xl font-bold text-[#C9A227] disabled:opacity-40">
                                            +
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setImageZoom(1)}
                                          className="text-sm font-medium text-[#C9A227] hover:text-[#B08D20]">
                                            Reset
                                        </button>
                                    </div>
                                    <p className="mt-2 text-center text-xs text-gray-500">
                                        Adjust your picture before saving. Maximum zoom is 300%.
                                    </p>
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