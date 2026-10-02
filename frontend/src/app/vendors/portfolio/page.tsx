"use client";

import { useState } from "react";

export default function VendorPortfolioPage() {
    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectImage, setProjectImage] = useState("");

    function handleSaveProject() {
        console.log("Potfolio project saved");
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
                            value={projectTitle}
                            onChange={(e) => setProjectTitle(e.target.value)}
                            placeholder="Enter your project title"
                            className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                    </div>
                    <div className="mt-5">
                        <label className="text-sm font-medium text-[#2B2B2B]">
                            Project Description
                        </label>
                        <textarea 
                           value={projectDescription}
                           onChange={(e) => setProjectDescription(e.target.value)}
                           placeholder="Describe this project"
                           rows={5}
                           className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]"/>
                    </div>
                    <div className="mt-5">
                        <label className="text-sm font-medium text-[#2B2B2B]">
                            Project Image
                        </label>
                        <input 
                            type="text"
                            value={projectImage}
                            onChange={(e) => setProjectImage(e.target.value)}
                            placeholder="Enter your image path"
                            className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                    </div>
                    <button
                        type="button"
                        onClick={handleSaveProject}
                        className={`mt-8 w-full rounded-full px-6 py-3 font-medium text-white ${
                            projectTitle.trim() !== "" &&
                            projectDescription.trim() !== "" &&
                            projectImage.trim() !== ""
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