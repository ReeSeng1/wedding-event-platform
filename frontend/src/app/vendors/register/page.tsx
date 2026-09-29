"use client";

import { useState } from "react";
export default function VendorRegisterPage() {
    const [businessName, setBusinessName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [category, setCategory] =useState("");

    return (
        <main className="min-h-screen bg-[#F9F7F0] px-6 py-16">
            <div className="mx-auto max-w-2xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Vendor Registration
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Join EverAfter
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-gray-600">
                        Create your vendor account and start showcasing your services to clients.
                    </p>
                </div>
                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 shadow-sm">
                    <div>
                        <label className="text-sm font-medium text-[#2B2B2B]">
                            Buisness Name
                        </label>
                        <input 
                           type="text"
                           value={businessName}
                           onChange={(e) => setBusinessName(e.target.value)}
                           placeholder="Enter your business name"
                           className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                    </div>
                    <div className="mt-5">
                        <label className="text-sm font-medium text-[#2B2B2B]">
                            Owner Name
                        </label>
                        <input 
                           type="text"
                           value={ownerName}
                           onChange={(e) => setOwnerName(e.target.value)}
                           placeholder="Enter your name"
                           className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" /> 
                    </div>
                    <div className="mt-5">
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
                            Phone Number
                        </label>
                        <input 
                           type="text"
                           value={phoneNumber}
                           onChange={(e) => setPhoneNumber(e.target.value)}
                           placeholder="Enter your phone number"
                           className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" /> 
                    </div>
                    <div className="mt-5">
                        <label className="text-sm font-medium text-[#2B2B2B]">
                            Vendor Category
                        </label>
                        <select 
                           value={category}
                           onChange={(e) =>setCategory(e.target.value)}
                           className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" >
                            <option value="">Select your category</option>
                            <option value="Photography">Photography</option>
                            <option value="Videography">Videography</option>
                            <option value="Decoration">Decoration</option>
                            <option value="Venues">Venues</option>
                            <option value="Wedding Dresses">Wedding Dresses</option>
                            <option value="Makeup & Hair">Makeup & Hair</option>
                            <option value="Music & DJ">Music & DJ</option>
                            <option value="Cakes">Cakes</option>
                        </select>
                    </div>
                </div>
            </div>
        </main>
    )
}