"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useVendorSelection } from "@/components/VendorSelectionContext";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export default function EventDetailsPage() {
    const router = useRouter();
    const { eventDetails, setEventDetails, selections } = useVendorSelection();
    const [budgetOpen, setBudgetOpen] = useState(false);
    const [eventTypeOpen, setEventTypeOpen] = useState(false);
    const [otherEventType, setOtherEvenetType] = useState("");
    const [error, setError] = useState("");
    const selectedVendors = Object.values(selections).filter(
        (vendor) => vendor !== ""
    );
    const today = new Date();
    const minimumDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
    ].join("-");
    function handleContinue() {
        setError("");

        if (selectedVendors.length === 0) {
            setError("Please select at least one vendor.");
            return;
        }

        if (!eventDetails.clientName.trim()) {
            setError("Please enter your name.");
            return;
        }

        const namePattern = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u;

        if (!namePattern.test(eventDetails.clientName.trim())) {
            setError("Your name must contain letters only.");
            return;
        }

        if (!eventDetails.clientEmail.trim()) {
            setError("Please enter your email address.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(eventDetails.clientEmail.trim())) {
            setError("Please enter a valid email address.");
            return;
        }

        const parsedPhone = parsePhoneNumberFromString(
            eventDetails.phoneNumber
        );

        if (!parsedPhone || !parsedPhone.isValid()) {
            setError("Please enter a valid phone number.");
            return;
        }

        if (!eventDetails.eventType.trim()) {
            setError("Please select an event type.");
            return;
        }

        if (!eventDetails.eventDate) {
            setError("Please select your event date.");
            return;
        }

        if (eventDetails.eventDate < minimumDate) {
            setError("Event date cannot be in the past.");
            return;
        }

        if (eventDetails.guestCount.trim()) {
            if (
                !/^[1-9]\d*$/.test(eventDetails.guestCount.trim()) ||
                !Number.isSafeInteger(Number(eventDetails.guestCount))
            ) {
                setError("Guest count must be a positive whole number.");
                return;
            }
        }
        setEventDetails({
            ...eventDetails,
            clientName: eventDetails.clientName.trim(),
            clientEmail: eventDetails.clientEmail.trim(),
            phoneNumber: parsedPhone.number,
        });
        router.push("/booking-summary");
    }
    return (
        <main className="min-h-screen bg-[#FAF9F6] px-8 pt-16">
            <div className="mx-auto max-w-5xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Almost There
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Event Details
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Tell us about your event so we can check your selected vendors and prepare your booking request.
                    </p>
                </div>

                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-6">
                    <h2 className="text-xl font-semibold text-[#2B2B2B]">
                        Your Selected Vendors
                    </h2>
                    {selectedVendors.length === 0 ? (
                        <p className="mt-4 text-gray-500">
                            You have not selected any vendors yet.
                        </p>
                    ) : (
                        <div className="mt-4 flex flex-wrap gap-3">
                            {selectedVendors.map((vendor, index) =>(
                                <span
                                   key={`${vendor}-${index}`}
                                   className="rounded-full bg-[#FAF9F6] px-4 py-2 text-sm text-[#2B2B2B]">
                                    {vendor}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <div className="mt-8 rounded-2xl border border-[#E8E1CC] bg-white p-6">
                    <h2 className="text-xl font-semibold text-[#2B2B2B]">
                        Your Information
                    </h2>
                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Your Name
                            </label>
                            <input 
                               type="text" 
                               value={eventDetails.clientName} 
                               onChange={(e) => setEventDetails({...eventDetails, clientName:e.target.value.replace(/[^\p{L}\p{M}\s.'’-]/gu,"" ),})} 
                               placeholder="Enter your name" 
                               className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#3B2418] outline-none focus:border-[#C9A227]"/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Email Address
                            </label>
                            <div className="mt-2 flex items-center rounded-xl border border-[#E8E1CC] bg-white focus-within:border-[#C9A227]">
                            <input 
                               type="text"
                               value={eventDetails.clientEmail.replace(/@gmail\.com$/i, "")}
                               onChange={(e) => 
                                setEventDetails({
                                    ...eventDetails,
                                    clientEmail: e.target.value.replace(/@.*$/, "") + "@gmail.com",
                                })
                               } 
                               placeholder="Enter your Gmail address"
                               required
                               className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]"/>
                               <span className="whitespace-nowrap pr-4 text-sm text-gray-500">
                                @gmail.com
                               </span>
                        </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Phone Number
                            </label>
                            <div className="mt-2">
                            <PhoneInput 
                               defaultCountry="et"
                               value={eventDetails.phoneNumber}
                               onChange={(phone) =>
                                 setEventDetails({...eventDetails, phoneNumber: phone,})
                               }
                               inputStyle={{
                                        width: "100%",
                                        height: "48px",
                                        border: "1px solid #E8E1CC",
                                        borderRadius: "0 12px 12px 0",
                                        color: "#2B2B2B",
                                        fontSize: "14px",
                                    }}
                               />
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                                Select your country and enter your phone number.
                        </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Number Of Guests
                            </label>
                            <input 
                               type="number"
                               min="1"
                               value={eventDetails.guestCount}
                               onChange={(e) =>
                                setEventDetails({...eventDetails, guestCount: e.target.value.replace(/\D/g, ""),})
                               }
                               placeholder="Enter Number of guests"
                               className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                        </div>
                        <div className="relative">
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Budget Range
                            </label>
                            <button
                               type="button"
                               onClick={() => setBudgetOpen(!budgetOpen)} 
                               className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]">
                                <span>
                                    {eventDetails.budget || "Select Budget Range"}
                                </span>
                                
                            </button>
                            {budgetOpen && (
                                <div className="absolute z-20 mt-2  w-full overflow-hidden rounded-xl border border-[#E8E1CC] bg-white shadow-lg">
                                    {[
                                        "Under 50,000 ETB",
                                        "50,000 - 100,000 ETB",
                                        "100,000 - 200,000 ETB",
                                        "200,000 - 500,000 ETB",
                                        "500,000+ ETB",
                                    ].map((budget) => (
                                        <button 
                                           key={budget}
                                           type="button"
                                           onClick={() => {
                                            setEventDetails({
                                                ...eventDetails,budget,
                                            });
                                            setBudgetOpen(false);
                                           }}
                                           className="block w-full px-4 py-3 text-left text-[#2B2B2B] hover:bg-[#C9A227] hover:text-white">
                                            {budget}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Event Location
                            </label>
                            <input 
                               type="text"
                               value={eventDetails.eventLocation}
                               onChange={(e) =>
                                setEventDetails({...eventDetails, eventLocation: e.target.value.replace(/[^\p{L}\p{M}\s]/gu, ""),})
                               }
                               placeholder="Enter the event location"
                               className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                        </div>
                        <div className="relative">
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Event Type
                            </label>
                            <button 
                               type="button"
                               onClick={() => setEventTypeOpen(!eventTypeOpen)}
                               className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]">
                                <span>
                                    {eventDetails.eventType || "Select Event Type"}
                                </span>
                            </button>
                            {eventTypeOpen && (
                                <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-[#E8E1CC] bg-white shadow-lg">
                                    {[
                                        "Wedding",
                                        "Nikah",
                                        "Church Wedding",
                                        "Tekleel",
                                        "Engagement",
                                        "Others",
                                    ].map((eventType) => (
                                        <button
                                           key={eventType}
                                           type="button"
                                           onClick={() => {
                                            setEventDetails({
                                                ...eventDetails,eventType
                                            });
                                            setEventTypeOpen(false);
                                           }}
                                           className="block w-full px-4 py-3 text-left text-[#2B2B2B] hover:bg-[#C9A227] hover:text-white">
                                            {eventType}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {eventDetails.eventType === "Others" && (
                                <div className="mt-4">
                                    <label className="text-sm font-medium text-[#2B2B2B]">
                                        Please specify your event type
                                    </label>

                                    <input type="text"
                                           value={otherEventType}
                                           onChange={(e) => {
                                                setOtherEvenetType(e.target.value);
                                            }}
                                           placeholder="Enter your event type"
                                           className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                                    <button 
                                       type="button"
                                       onClick={() => {
                                         if (otherEventType.trim() !== "") {
                                            setEventDetails({
                                                ...eventDetails, eventType: otherEventType,
                                            });
                                         }
                                       }}
                                       disabled={otherEventType.trim() === ""}
                                       className="mt-3 rounded-xl bg-[#C9A227] px-5 py-2 text-sm font-medium text-white hover:bg-[#B08D20] disabled:cursor-not-allowed disabled:opacity-50">
                                        Save Event Type
                                    </button>       
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Event Date
                            </label>
                            <input 
                              type="date"
                              value={eventDetails.eventDate}
                              onChange={(e) =>
                                setEventDetails({...eventDetails, eventDate: e.target.value})
                              }
                              className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Additional Message
                            </label>
                            <textarea 
                            value={eventDetails.message}
                            onChange={(e) =>
                                setEventDetails({...eventDetails, message:e.target.value})
                            }
                            placeholder="Tell us anything important about your event..."
                            rows={4}
                            className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]"/>
                        </div>
                    </div>
                </div>
                <button 
                   type="button"
                   onClick={handleContinue}
                   className="mt-8 w-full rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50">
                    Continue to Booking Summary
                </button>
            </div>
        </main>
    );
}    