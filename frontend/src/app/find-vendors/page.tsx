"use client";

import { useState } from "react";

export default function FindVendorsPage() {
    const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
    const [eventType, setEventType] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [clientName, setClientName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    function handleSubmit() {
        console.log({
            clientName,
            phoneNumber,
            message,
            selectedVendors,
            eventType,
            eventDate,
        });
        setSubmitted(true);
    }
    return (
        <main className="min-h-screen bg-[#FAF9F6] px-8 py-16">
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Start Planning
                    </p>

                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Build Your Wedding Plan
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Choose the vendors you need for your special day and build
                        your personalized wedding plan.
                    </p>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 text-center">
                            <h2 className="text-lg font-semibold text-[#2B2B2B]">
                                Photography
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Find photographers for your special moments.
                            </p>

                            <button
                                onClick={() =>
                                    setSelectedVendors((current) =>
                                        current.includes("Photography")
                                            ? current
                                            : [...current, "Photography"]
                                    )
                                }
                                className="mt-5 rounded-full border border-[#C9A227] px-5 py-2 text-[#C9A227] hover:bg-[#FAF9F6]"
                            >
                                Choose
                            </button>
                        </div>
                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 text-center">
                            <h2 className="text-lg font-semibold text-[#2B2B2B]">
                                Decoration
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Find decorators to create your perfect setting.
                            </p>

                            <button
                                onClick={() =>
                                    setSelectedVendors((current) =>
                                        current.includes("Decoration")
                                            ? current
                                            : [...current, "Decoration"]
                                    )
                                }
                                className="mt-5 rounded-full border border-[#C9A227] px-5 py-2 text-[#C9A227] hover:bg-[#FAF9F6]"
                            >
                                Choose
                            </button>
                        </div>
                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 text-center">
                            <h2 className="text-lg font-semibold text-[#2B2B2B]">
                                Venues
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Find a venue that fits your event.
                            </p>

                            <button
                                onClick={() =>
                                    setSelectedVendors((current) =>
                                        current.includes("Venues")
                                            ? current
                                            : [...current, "Venues"]
                                    )
                                }
                                className="mt-5 rounded-full border border-[#C9A227] px-5 py-2 text-[#C9A227] hover:bg-[#FAF9F6]"
                            >
                                Choose
                            </button>
                        </div>
                        <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 text-center">
                            <h2 className="text-lg font-semibold text-[#2B2B2B]">
                                Makeup & Hair
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Find beauty professionals for your event.
                            </p>

                            <button
                                onClick={() =>
                                    setSelectedVendors((current) =>
                                        current.includes("Makeup & Hair")
                                            ? current
                                            : [...current, "Makeup & Hair"]
                                    )
                                }
                                className="mt-5 rounded-full border border-[#C9A227] px-5 py-2 text-[#C9A227] hover:bg-[#FAF9F6]"
                            >
                                Choose
                            </button>
                        </div>
                    </div>
                    <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-6">
                        <h2 className="text-xl font-semibold text-[#2B2B2B]">
                            My Wedding Plan
                        </h2>

                        {selectedVendors.length === 0 ? (
                            <p className="mt-4 text-gray-500">
                                You have not selected any vendors yet.
                            </p>
                        ) : (
                            <div className="mt-4 flex flex-wrap gap-3">
                                {selectedVendors.map((vendor) => (
                                    <div
                                        key={vendor}
                                        className="flex items-center gap-2 rounded-full border border-[#E8E1CC] bg-[#FAF9F6] px-4 py-2"
                                    >
                                        <span className="text-sm text-[#2B2B2B]">
                                            {vendor}
                                        </span>

                                        <button
                                            onClick={() =>
                                                setSelectedVendors((current) =>
                                                    current.filter(
                                                        (item) => item !== vendor
                                                    )
                                                )
                                            }
                                            className="text-sm text-[#C9A227] hover:text-[#B08D20]"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="mt-8 rounded-2xl border border-[#E8E1CC] bg-white p-6">
                        <h2 className="text-xl font-semibold text-[#2B2B2B]">
                            Event Details
                        </h2>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium text-[#2B2B2B]">
                                    Your Name
                                </label>
                                <input 
                                   type="text"
                                   value={clientName}
                                   onChange={(event) => setClientName(event.target.value)}
                                   placeholder="Enter your name"
                                   className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 outline-none focus:border-[#C9A227]" />
                            </div>
                            <div>
                              <label className="text-sm font-medium text-[#2B2B2B]">
                                  Phone Number
                              </label>

                              <input
                                   type="tel"
                                   value={phoneNumber}
                                   onChange={(event) => setPhoneNumber(event.target.value)}
                                   placeholder="Enter your phone number"
                                   className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 outline-none focus:border-[#C9A227]"
                                   />
                            </div>
                            <div className="md:col-span-2">
                              <label className="text-sm font-medium text-[#2B2B2B]">
                                 Additional Message
                              </label>

                              <textarea
                                 value={message}
                                 onChange={(event) => setMessage(event.target.value)}
                                 placeholder="Tell us anything important about your event..."
                                 rows={4}
                                 className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 outline-none focus:border-[#C9A227]"
                                 />
                                 </div>
                            <div>
                                <label className="text-sm font-medium text-[#2B2B2B]">
                                    Event Type
                                </label>
                                <select 
                                    value={eventType}
                                    onChange={(event) => setEventType(event.target.value)}
                                    className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 outline-none focus:border-[#C9A227]">
                                    <option value="">Select EVent Type</option>
                                    <option value="Wedding">Wedding</option>
                                    <option value="Nikah">Nikah</option>
                                    <option value="Church Wedding">Church Wedding</option>
                                    <option value="Tekleel">Tekleel</option>
                                    <option value="Engagement">Engagement</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-[#2B2B2B]">
                                    Event Date
                                </label>
                                <input type="date" value={eventDate} onChange={(event) =>setEventDate(event.target.value)} className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 outline-none focus:border-[£C9A227]" />
                            </div>
                        </div>
                    </div>
                    {eventType && eventDate && (
                    <div className="mt-8 rounded-2xl border border-[#E8E1CC] bg-white p-6">
                        <h2 className="text-xl font-semibold text-[#2B2B2B]">
                            Your Event
                        </h2>
                        <p className="mt-4 text-gray-600">
                            Event Type: <span className="font-medium text[#2B2B2B]">{eventType}</span>
                        </p>
                        <p className="mt-2 text-gray-600">
                            Event Date: <span className="font-medium text-[#2B2B2B]">{eventDate}</span>
                        </p>
                    </div>
                    )}
                    <button
                        onClick={handleSubmit}
                        disabled={selectedVendors.length === 0 || !eventType || !eventDate || !clientName || !phoneNumber}
                        className="mt-8 w-full rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white hover:bg[#B08D20]">
                        Submit Booking Request
                    </button>
                    {submitted && (
                      <div className="mt-6 rounded-2xl border border-[#E8E1CC] bg-[#FAF9F6] p-5 text-center">
                         <p className="font-medium text-[#2B2B2B]">
                             Your booking request has been submitted successfully.
                         </p>

                         <p className="mt-2 text-sm text-gray-600">
                             We will check the availability of your selected vendors.
                         </p>
                      </div>
)}
                </div>
            </div>
        </main>
    );
}

