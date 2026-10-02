"use client";

import { useEffect, useState } from "react";
import { getVendor, saveVendor } from "@/lib/vendorStorage";

export default function VendorProfilePage() {
    const [businessName, setBusinessName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [category, setCategory] =useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] =useState("");
    const [categoryOpen, setCategoryOpen] = useState(false);

    useEffect(() => {
        const vendor = getVendor();

        if(vendor) {
            setBusinessName(vendor.businessName);
            setOwnerName(vendor.ownerName);
            setEmail(vendor.email);
            setPhoneNumber(vendor.phoneNumber);
            setCategory(vendor.category);
            setLocation(vendor.location);
            setDescription(vendor.description);
        }
    }, []);
    function handleSaveProfile() {
        const vendor = getVendor();
        if(!vendor) {
            return;
        }
        saveVendor({
            ...vendor,
            businessName,
            ownerName,
            email,
            phoneNumber,
            category,
            location,
            description,
        });
        console.log("Vendor profile saved");
    }
    return (
        <main className="min-h-screen bg-[#F9F7F0] px-6 py-16">
            <div className="mx-auto max-w-3xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Vendor Profile
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        My Business Profile
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-gray-600">
                        Add your business information so clients can learn more about your services.
                    </p>
                </div>
                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 shadow-sm">
                    <div>
                        <label className="text-sm font-medium text-[#2B2B2B]">
                            Business Name
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
                           onChange={(e) =>setPhoneNumber(e.target.value)}
                           placeholder="Enter your phone number"
                           className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                    </div>
                    <div className="mt-5">
                        <label className="text-sm font-medium text-[#2B2B2B]">
                            Vendor Category
                        </label>
                        <div className="relative mt-2">
                        <button
                           type="button"
                           onClick={() => setCategoryOpen(!categoryOpen)}
                           className="flex w-full items-center justify-between rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-left text-[#2B2B2B] outline-none hover:border-[#C9A227]">
                            <span>
                                {category || "Select your category"}
                            </span>
                        </button>
                        {categoryOpen && (
                            <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-[#E8E1CC] bg-white shadow-lg">
                                {[
                                    "Photography",
                                    "Videography",
                                    "Decoration",
                                    "Venues",
                                    "Wedding Dresses",
                                    "Makeup & Hair",
                                    "Music & DJ",
                                    "Cakes",
                                ].map((item) => (
                                    <button
                                       key={item}
                                       type="button"
                                       onClick={() => {
                                        setCategory(item);
                                        setCategoryOpen(false);
                                       }}
                                       className="block w-full px-4 py-3 text-left text-[#2B2B2B] hover:bg-[#C9A227] hover:text-[#2B2B2B]">
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}
                        </div>
                    </div>
                    <div className="mt-5">
                        <label className="text-sm font-medium text-[#2B2B2B]">
                            Location
                        </label>
                        <input 
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter you business location"
                            className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                    </div>
                    <div className="mt-5">
                        <label className="text-sm font-medium text-[#2B2B2B]">
                            Business Description
                        </label>
                        <textarea 
                           value={description} 
                           onChange={(e) => setDescription(e.target.value)}
                           placeholder="Tell clients about your business and services"
                           rows={5}
                           className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                    </div>
                    <button
                       type="button"
                       onClick={handleSaveProfile}
                       className={`mt-8 w-full rounded-full px-6 py-3 font-medium text-white ${
                         businessName.trim() !== "" && 
                         ownerName.trim() !== "" &&
                         email.trim() !== "" &&
                         phoneNumber.trim() !== "" &&
                         category !== "" &&
                         location.trim() !== "" &&
                         description.trim() !== ""
                            ?"bg-[#C9A227] hover:bg-[#B08D20]"
                            :"bg-gray-300"
                       }`}>
                        Save Profile
                    </button>
                </div>
            </div>
        </main>
    )
}