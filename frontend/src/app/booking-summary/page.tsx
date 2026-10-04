"use client";

import { useRouter } from "next/navigation";
import { useVendorSelection } from "@/components/VendorSelectionContext";
import { getVendor, saveVendor } from "@/lib/vendorStorage";
import { saveRequest } from "@/lib/requestStorage";

export default function BookingSummaryPage() {
    const router = useRouter();
    const { selections, eventDetails } = useVendorSelection();
    const selectedVendors = Object.entries(selections).filter(
        ([, vendor]) => vendor !== ""
    );
    function handleFinishBooking() {
        const requestId = Date.now().toString();
        const vendor = getVendor();

        if (!vendor) {
            return;
        }

        const vendorSelected = selectedVendors.some(
            ([, selectedVendor]) => selectedVendor === vendor.businessName
        );
        if (!vendorSelected) {
            console.log("Selected vendor account was not found");
            return;
        }
        saveRequest({
            id: requestId,
            clientName: eventDetails.clientName,
            phoneNumber: eventDetails.phoneNumber,
            eventType:eventDetails.eventType,
            eventDate: eventDetails.eventDate,
            eventLocation: eventDetails.eventLocation,
            guestCount: eventDetails.guestCount,
            budget: eventDetails.budget,
            message: eventDetails.message,
            status: "Pending",
        })
        saveVendor({
            ...vendor,
            requests: [
                ...vendor.requests,
                {
                    id: requestId,
                    clientName: eventDetails.clientName,
                    phoneNumber: eventDetails.phoneNumber,
                    eventType: eventDetails.eventType,
                    eventDate: eventDetails.eventDate,
                    eventLocation: eventDetails.eventLocation,
                    guestCount: eventDetails.guestCount,
                    budget: eventDetails.budget,
                    message: eventDetails.message,
                    status:"Pending",
                },
            ],
        });
        console.log("Booking request sent");
        router.push("/booking-success");
    }

    return (
        <main className="min-h-screen bg-[#FAF9F6] px-8 py-16">
            <div className="mx-auto max-w-5xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        EverAfter
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Booking Summary
                    </h1>
                    <p className="mt-4 text-gray-600">
                        Review your vendors and event details before finishing your booking.
                    </p>
                </div>
                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-6">
                    <h2 className="text-2xl font-semibold text-[#2B2B2B]">
                        Selected Vendors
                    </h2>
                    <div className="mt-5 space-y-4">
                        {selectedVendors.map(([category, vendor]) => (
                            <div
                               key={category}
                               className="flex items-center justify-between rounded-xl bg-[#FAF9F6] p-4">
                                <div>
                                    <p className="text-sm capitalize text-gray-500">
                                        {category === "dress"
                                           ?"Wedding Dresses"
                                           :category === "makeup"
                                           ?"Makeup & Hair"
                                           :category}
                                    </p>
                                    <p className="mt-1 font-semibold text-[#2B2B2B]">
                                        {vendor}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-6 rounded=2xl border border-[#E8E1CC] bg-white p-6">
                    <h2 className="text-2xl font-semibold text-[#2B2B2B]">
                        Event Details
                    </h2>
                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-gray-500">
                                Client Name
                            </p>
                            <p className="mt-1 font-medium text-[#2B2B2B]">
                                {eventDetails.clientName}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Phone Number
                            </p>
                            <p className="mt-1 font-medium text-[#2B2B2B]">
                                {eventDetails.phoneNumber}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Event Type
                            </p>
                            <p className="mt-1 font-medium capitalize text-[#2B2B2B]">
                                {eventDetails.eventType}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Event Date
                            </p>
                            <p className="mt-1 font-medium text-[#2B2B2B]">
                                {eventDetails.eventDate}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Guest Count
                            </p>
                            <p className="mt-1 font-medium text-[#2B2B2B]">
                                {eventDetails.guestCount || "Not Provided"}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Budget
                            </p>
                            <p className="mt-1 font-medium text-[#2B2B2B]">
                                {eventDetails.budget || "Not Provided"}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Event Location
                            </p>
                            <p className="mt-1 font-medium text-[#2B2B2B]">
                                {eventDetails.eventLocation || "Not provided"}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Message
                            </p>
                            <p className="mt-1 font-medium text-[#2B2B2B]">
                                {eventDetails.message || "No message"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <button 
                       onClick={() => router.push("/event-details")}
                       className="w-full rounded-full border border-[#C9A227] px-6 py-3 font-medium text-[#C9A227] hover:bg-[#FAF9F6]">
                        Back to Event Details
                    </button>
                    <button 
                       type="button"
                       onClick={handleFinishBooking}
                       className="w-full rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white hover:bg-[#B08D20]">
                        Finish Booking
                    </button>
                </div>
            </div>
        </main>
    )
}