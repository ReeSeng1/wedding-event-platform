import { useState } from "react";
import { useRouter } from "next/navigation";
import { useVendorSelection } from "@/components/VendorSelectionContext";

export default function EventDetailsPage() {
    const router = useRouter();

    const { selections } = useVendorSelection();

    const [clientName, setClientName] =useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [guestCount, setGuestCount] = useState("");
    const [budget, setBudget] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [message, setMessage] =useState("");
    const [eventType, setEventType] = useState("");
    const [eventDate, setEventDate] = useState("");

    const selectedVendors = Object.values(selections).filter(
        (vendor) => vendor !== ""
    );

    function handleContinue() {
        if(
            selectedVendors.length === 0 ||
            !clientName ||
            !phoneNumber ||
            !eventType ||
            !eventDate
        ) {
            return;
        }
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
                            {selectedVendors.map((vendor) =>(
                                <span
                                   key={vendor}
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
                    <div className="mt-6 gris gap-6 md:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Your Name
                            </label>
                            <input 
                               type="text" 
                               value={clientName} 
                               onChange={(event) => setClientName(event.target.value)} 
                               placeholder="Enter your name" 
                               className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 outline-none focus:border-[#C9A227]"/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Phone Number
                            </label>
                            <input 
                               type="tel"
                               value={phoneNumber}
                               onChange={(event) =>
                                 setPhoneNumber(event.target.value)
                               }
                               placeholder="Enter your phone number"
                               className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 outline-none focus:border-[#C9A227]" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Number Of Guests
                            </label>
                            <input 
                               type="number"
                               min="1"
                               value={guestCount}
                               onChange={(event) =>
                                setGuestCount(event.target.value)
                               }
                               placeholder="Enter Number of guests"
                               className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 outline-none focus:border-[#C9A227]" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Budget Range
                            </label>
                            <select 
                               value={budget} 
                               onChange={(event) => 
                                  setBudget(event.target.value)
                                } 
                                className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 outline-none focus:border-[#C9A227]">
                                <option value="">
                                    Select Budget Range
                                </option>
                                <option value="">
                                    Under 50,000 ETB
                                </option>
                                <option value="">
                                    50,000 - 100,000 ETB
                                </option>
                                <option value="">
                                    100,000 - 200,000 ETB
                                </option>
                                <option value="">
                                    200,000 - 500,000 ETB
                                </option>
                                <option value="">
                                    500,000+ ETB
                                </option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Event Location
                            </label>
                            <input 
                               type="text"
                               value={eventLocation}
                               onChange={(event) =>
                                setEventLocation(event.target.value)
                               }
                               placeholder="Enter the event location"
                               className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 outline-none focus:border-[#C9A227]" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Event Type
                            </label>
                            <select 
                               value={eventType}
                               onChange={(event) =>
                                setEventType(event.target.value)
                               }
                               className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 outline-none focus:border-[#C9A227]">
                                <option value="">Select Event Type</option>
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
                            <input 
                              type="date"
                              value={eventDate}
                              onChange={(event) =>
                                setEventDate(event.target.value)
                              }
                              className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 outline-none focus:border-[#C9A227]" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Additional Message
                            </label>
                            <textarea 
                            value={message}
                            onChange={(event) =>
                                setMessage(event.target.value)
                            }
                            placeholder="Tell us anything important about your event..."
                            rows={4}
                            className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 outline-none focus:border-[#C9A227]"/>
                        </div>
                    </div>
                </div>
                <button 
                   onClick={handleContinue}
                   disabled={
                    selectedVendors.length === 0 ||
                    !clientName ||
                    !phoneNumber ||
                    !eventType ||
                    !eventDate 
                   }
                   className="mt-8 w-full rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50">
                    Continue to Booking Summary
                </button>
            </div>
        </main>
    );
}    