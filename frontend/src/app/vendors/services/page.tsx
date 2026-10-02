"use client";

import { useEffect,useState } from "react";
import { getVendor, saveVendor} from "@/lib/vendorStorage";

export default function VendorServicesPage() {
    const [serviceName, setServiceName] = useState("");
    const [serviceDescription, setServiceDescription] = useState("");
    const [servicePrice, setServicePrice] = useState("");

    useEffect(() => {
        const vendor = getVendor();

        if(vendor) {
            setServiceName(vendor.serviceName);
            setServiceDescription(vendor.serviceDescription);
            setServicePrice(vendor.servicePrice);
        }
    }, []);

    function handleSaveService() {
        const vendor = getVendor();

        if(!vendor) {
            return;
        }

        saveVendor({
            ...vendor,
            serviceName,
            serviceDescription,
            servicePrice,
        });
        console.log("Service saved");
    }
    return (
        <main className="min-h-screen bg-[#F9F7F0] px-6 py-16">
            <div className="mx-auto max-w-3xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Vendor Services
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        My Services
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-gray-600">
                        Add the services your business provides so clients can learn what you offer.
                    </p>
                </div>
                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 shadow-sm">
                    <div>
                        <label className="text-sm font-medium text-[#2B2B2B]">
                            Service Name
                        </label>
                        <input 
                           type="text"
                           value={serviceName}
                           onChange={(e) => setServiceName(e.target.value)}
                           placeholder="Enter your service name"
                           className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                    </div>
                
                <div className="mt-5">
                    <label className="text-sm font-medium text-[#2B2B2B]">
                        Services Description
                    </label>
                    <textarea 
                       value={serviceDescription}
                       onChange={(e) => setServiceDescription(e.target.value)}
                       placeholder="Describe what this services includes"
                       rows={5}
                       className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]"/>
                </div>
                <div className="mt-5">
                    <label className="text-sm font-medium text-[#2B2B2B]">
                        Services Price
                    </label>
                    <input 
                       type="number"
                       value={servicePrice}
                       onChange={(e) => setServicePrice(e.target.value)}
                       placeholder="Enter your service price"
                       className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                </div>
              </div>  
              <button
                 type="button"
                 onClick={handleSaveService}
                 className={`mt-8 w-full rounded-full px-6 py-3 font-medium text-white ${
                    serviceName.trim() !== "" &&
                    serviceDescription.trim() !== "" &&
                    servicePrice.trim() !== ""
                      ? "bg-[#C9A227] hover:bg-[#B08D20]"
                      : "bg-gray-300"
                 }`}>
                Save Service
              </button>
            </div>
        </main>
    );
}