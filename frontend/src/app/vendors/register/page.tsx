"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveVendor } from "@/lib/vendorStorage";
export default function VendorRegisterPage() {
    const router = useRouter();
    const [businessName, setBusinessName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [category, setCategory] =useState("");
    const [categoryOpen, setCategoryOpen] = useState(false);

    function handleRegister() {
        if (
            businessName.trim() === "" ||
            ownerName.trim() === "" ||
            email.trim() === "" ||
            phoneNumber.trim() === "" ||
            category.trim() === "" ||
            password.trim() === ""
        ) {
            return;
        }
        saveVendor({
            businessName,
            ownerName,
            email,
            phoneNumber,
            password,
            category,
            location: "",
            description: "",
            serviceName: "",
            serviceDescription: "",
            servicePrice: "",
        });
        console.log("Vendor Registration submitted");

        router.push("/vendors/login");
    }

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
                        <div className="relative mt-2">
                        <button
                           type="button"
                           onClick={() =>setCategoryOpen(!categoryOpen)}
                           className="flex w-full items-center justify-between rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-left text-[#2B2B2B] outline-none hover:border-[#C9A227]" >
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
                                       className="block w-full px-4 py-3 text-left text-[#2B2B2B] hover:bg-[#C9A227] hover:text-white">
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                   </div>
                   <div className="mt-5">
                    <label className="text-sm font-medium text-[#2B2B2B]">
                        Password
                    </label>
                    <input
                       type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Create a password"
                       className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]"
                    />
                   </div>
                   </div>
                   
                   <button
                      type="button"
                      onClick={handleRegister}
                      disabled={
                        businessName.trim() === "" ||
                        ownerName.trim() === "" ||
                        email.trim() === "" ||
                        phoneNumber.trim() === "" ||
                        category === "" ||
                        password.trim() === ""  
                      }
                      className="mt-8 w-full rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white hover:bg-[#B08D20] disabled:cursor-not-allowed disabled:bg-gray-300">
                    Create Vendor Account
                   </button>
                   
            </div>
        </main>
    );
}