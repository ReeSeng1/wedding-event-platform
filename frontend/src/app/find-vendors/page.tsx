"use client";

import { useState } from "react";

const photographyVendors = [
    {
        id: "1",
        name: "Luna Photography",
        location:"Addis Ababa"
    },
    {
        id: "2",
        name: "Ethiopian Moments Photography",
        location:"Addis Ababa",
    },
    {
        id: "3",
        name: "Golden Frame Photography",
        location: "Addis Ababa",
    },
];
const videographyVendors = [
    {
        id: "1",
        name: "Everlasting Films",
        location: "Addis Ababa",
    },
    {
        id: "2",
        name: "Golden Moments Studio",
        location: "Addis Ababa",
    },
    {
        id: "3",
        name: "Dream Wedding Films",
        location: "Addis Ababa",
    },
];
const dressVendors =[
    {
        id: "1",
        name: "Bridal Elegance",
        location: "Addis Ababa",
    },
    {
        id: "2",
        name: "Royal Bridal Boutique",
        location: "Addis Ababa",
    },
    {
        id: "3",
        name: "Dream Dress Studio",
        location: "Addis Ababa",
    },
];
const decorationVendors = [
    {
        id:"1",
        name: "Elegant Events",
        location: "Addis Ababa",
    },
    {
        id: "2",
        name: "Royal Decor",
        location: "Addis Ababa",
    },
    {
        id: "3",
        name: "Dream Wedding Decor",
        location: "Addis Ababa",
    },
];
const venueVendors = [
    {
        id: "1",
        name: "Grand Garden Venue",
        location: "Addis Ababa",
    },
    {
        id: "2",
        name: "Royal Palace Venue",
        location: "Addis Ababa",
    },
    {
        id: "3",
        name: "Green Valley Events Venue",
        location: "Addis Ababa",
    },
];
const makeupVendors = [
    {
        id: "1",
        name: "Bella Beauty",
        location: "Addis Ababa",
    },
    {
        id: "2",
        name: "Glow Beauty Studio",
        location: "Addis Ababa",
    },
    {
        id: "3",
        name: "Royal Beauty",
        location: "Addis Ababa",
    },
];
export default function FindVendorsPage() {
    const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
    const [eventType, setEventType] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [clientName, setClientName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [guestCount, setGuestCount] = useState("");
    const [budget, setBudget] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [showPhotographyVendors, setShowPhotographyVendors] = useState(false);
    const [showDecorationVendors, setShowDecorationVendors] = useState(false);
    const [showVenueVendors, setShowVenueVendors] = useState(false);
    const [showMakeupVendors, setShowMakeupVendors] = useState(false);
    const [showVideographyVendors, setShowVideographyVendors] = useState(false);
    const [showDressVendors, setShowDressVendors] = useState(false);
    function handleSubmit() {
        console.log({
            clientName,
            phoneNumber,
            guestCount,
            budget,
            eventLocation,
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
                                onClick={() =>setShowPhotographyVendors(true)}
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
                                onClick={() => setShowDecorationVendors(true)}
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
                                onClick={() => setShowVenueVendors(true)}
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
                                onClick={() => setShowMakeupVendors(true)}
                                className="mt-5 rounded-full border border-[#C9A227] px-5 py-2 text-[#C9A227] hover:bg-[#FAF9F6]"
                            >
                                Choose
                            </button>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-[#E8E1CC] bg-white p-6 text-center">
                        <h2 className="text-lg font-semibold text-[#2B2B2B]">
                            Videography
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Find Videographers to capture your special moments.
                        </p>
                        <button 
                            onClick={() => setShowVideographyVendors(true)}
                            className="mt-5 rounded-full border border-[#C9A227] px-5 py-2 text-[#C9A227] hover:bg-[#FAF9F6]">
                                Choose
                            </button>
                    </div>
                    <div className="rounded-2xl border border-[#E81CC] bg-white p-6 text-center">
                        <h2 className="text-lg font-semibold text-[#2B2B2B]">
                            Wedding Dresses
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Find beautiful wedding dresses for your special day.
                        </p>
                        <button 
                           onClick={() => setShowDressVendors(true)}
                           className="mt-5 rounded-full border border-[#C9A227] px-5 py-2 text-[#C9A227] hover:bg-[#FAF9F6]">
                            Choose
                           </button>
                    </div>
                    {showPhotographyVendors && (
                        <div className="mt-6 rounded-2xl border border-[#E8E1CC] bg-white p-6">
                            <h2 className="text-xl font-semibold text-[#2B2B2B]">
                                Photography Vendors
                            </h2>
                            <div className="mt-4 grid gap-4 md:grid-cols-3">
                                {photographyVendors.map((vendor) =>(
                                    <div key={vendor.id} className="rounded-xl border border-[#E8E1CC] bg-[#FAF9F6] p-5">
                                        <h3 className="text-lg font-semibold text-[#2B2B2B]">
                                            {vendor.name}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            📍{vendor.location}
                                        </p>
                                        <button 
                                           onClick={() => 
                                            setSelectedVendors((current) =>
                                              current.includes(vendor.name)
                                                ? current
                                                :[...current, vendor.name] )  }
                                           className="mt-4 w-full rounded-full border border-[#C9A227] py-2 text-[#C9A227] hover:bg-[#FAF9F6]">
                                            {selectedVendors.includes(vendor.name)
                                            ? "Selected"
                                            : "Choose Vendor"}
                                           </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {showDecorationVendors &&(
                        <div className="mt-6 rounded-2xl border border-[#E8E1CC] bg-white p-6">
                            <h2 className="text-xl font-semibold text-[#2B2B2B]">
                                Decoration Vendors
                            </h2>
                            <div className="mt-4 grid gap-4 md:grid-cols-3">
                                {decorationVendors.map((vendor) => (
                                    <div key={vendor.id} className="rounded-xl border border-[#E8E1CC] bg-[#FAF9F6] p-5">
                                        <h3 className="text-lg font-semibold text-[#2B2B2B]">
                                            {vendor.name}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            📍{vendor.location}
                                 
                                        </p>
                                        <button
                                           onClick={() =>
                                            setSelectedVendors((current) =>
                                              current.includes(vendor.name)
                                               ?current
                                               :[...current, vendor.name])
                                           }
                                           className="mt-4 w-full rounded-full border border-[#C9A227] py-2 text-[#C9A227] hover:bg-[#FAF9F6]">
                                            {selectedVendors.includes(vendor.name)
                                               ? "Selected"
                                               : "Choose Vendor"}
                                           </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {showVenueVendors &&(
                        <div className="mt-6 rounded-2xl border border-[#E8E1CC] bg-white p-6">
                            <h2 className="text-xl font-semibold text-[#2B2B2B]">
                                Venue Vendors
                            </h2>
                            <div className="mt-4 grid gap-4 md:grid-cols-3">
                                {venueVendors.map((vendor) => (
                                    <div key={vendor.id} className="rounded-xl border border-[#E8E1CC] bg-[#FAF9F6] p-5">
                                        <h3 className="text-lg font-semibold text-[#2B2B2B]">
                                            {vendor.name}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            📍{vendor.location}
                                 
                                        </p>
                                        <button
                                           onClick={() =>
                                            setSelectedVendors((current) =>
                                              current.includes(vendor.name)
                                               ?current
                                               :[...current, vendor.name])
                                           }
                                           className="mt-4 w-full rounded-full border border-[#C9A227] py-2 text-[#C9A227] hover:bg-[#FAF9F6]">
                                            {selectedVendors.includes(vendor.name)
                                              ? "Selected"
                                              : "Choose Vendor"}
                                           </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {showMakeupVendors &&(
                        <div className="mt-6 rounded-2xl border border-[#E8E1CC] bg-white p-6">
                            <h2 className="text-xl font-semibold text-[#2B2B2B]">
                                Makeup & Hair Vendors
                            </h2>
                            <div className="mt-4 grid gap-4 md:grid-cols-3">
                                {makeupVendors.map((vendor) => (
                                    <div key={vendor.id} className="rounded-xl border border-[#E8E1CC] bg-[#FAF9F6] p-5">
                                        <h3 className="text-lg font-semibold text-[#2B2B2B]">
                                            {vendor.name}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            📍{vendor.location}
                                 
                                        </p>
                                        <button
                                           onClick={() =>
                                            setSelectedVendors((current) =>
                                              current.includes(vendor.name)
                                               ?current
                                               :[...current, vendor.name])
                                           }
                                           className="mt-4 w-full rounded-full border border-[#C9A227] py-2 text-[#C9A227] hover:bg-[#FAF9F6]">
                                            {selectedVendors.includes(vendor.name)
                                              ? "Selected"
                                              : "Choose Vendor"}
                                           </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {showVideographyVendors && (
                        <div className="mt-6 rounded-2xl border border-[#E8E1CC] bg-white p-6">
                            <h2 className="text-xl font-semibold text-[#2B2B2B]">
                                Videography Vendors
                            </h2>
                            <div className="mt-4 grid gap-4 md:grid-cols-3">
                                {videographyVendors.map((vendor) => (
                                    <div 
                                      key={vendor.id}
                                      className="rounded-xl border border-[#E8E1CC] bg-[#FAF9F6] p-5">
                                        <h3 className="text-lg font-semibold text-[#2B2B2B]">
                                            {vendor.name}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            📍 {vendor.location}
                                        </p>
                                        <button 
                                           onClick={() => 
                                             setSelectedVendors((current) =>
                                               current.includes(vendor.name)
                                                  ?current
                                                  : [...current, vendor.name])
                                           }
                                           className="mt-4 w-full rounded-full border border-[#C9A227] py-2 text-[#C9A227] hover:bg-[#FAF9F6]">
                                            {selectedVendors.includes(vendor.name)
                                               ? "Selected"
                                               : "Choose Vendor"}
                                           </button>
                                      </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {showDressVendors && (
                        <div className="mt-6 rounded-2xl border border-[#E8E1CC] bg-white p-6">
                            <h2 className="text-xl font-semibold text-[#2B2B2B]">
                                Wedding Dress Vendors
                            </h2>
                            <div className="mt-4 grid gap-4 md:grid-cols-3">
                                {dressVendors.map((vendor) => (
                                    <div 
                                       key={vendor.id}
                                       className="rounded-xl border border-[#E8E1CC] bg-[#FAF9F6] p-5">
                                        <h3 className="text-lg font-semibold text-[#2B2B2B]">
                                            {vendor.name}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            📍 {vendor.location}
                                        </p>
                                        <button 
                                           onClick={() =>
                                             setSelectedVendors((current) =>
                                                current.includes(vendor.name)
                                                   ? current
                                                   : [...current, vendor.name])
                                           }
                                           className="mt-4 w-full rounded-full border border-[#C9A227] py-2 text-[#C9A227] hover:bg-[#FAF9F6]">
                                            {selectedVendors.includes(vendor.name)
                                                ? "Selected"
                                                : "Choose Vendor"}
                                           </button>
                                       </div>
                                ))}
                            </div>
                        </div>
                    )}
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
                            <div>
                                    <label className="text-sm font-medium text-[#2B2B2B]">
                                        Number of Guests
                                    </label>
                                    <input 
                                        type="number"
                                        value={guestCount}
                                        onChange={(event) => setGuestCount(event.target.value)}
                                        placeholder="Enter number of guests"
                                        min="1"
                                        className="mt-2 w-full rounded-xl bored border-[#E8E1CC] bg-white px-4 py-3 outline-none focus:border-[#C9A227]" />
                                 </div>
                                 <div>
                                    <label className="text-sm font-medium text-[#2B2B2B]">
                                        Budget Range
                                    </label>
                                    <select 
                                       value={budget} 
                                       onChange={(event) => setBudget(event.target.value)}
                                       className="mt-2 w-full rounded-xl border border-[#E8E1CC] bg-white px-4 py-3 outline-none focus:border-[#C9A227]">
                                        <option value="">Select Budget Range</option>
                                        <option value="Under 50,000 ETB">Under 50,000 ETB</option>
                                        <option value="50,000 - 100,000 ETB">50,000 - 100,000 ETB</option>
                                        <option value="100,000 - 200,000 ETB">100,000 - 200,000 ETB</option>
                                        <option value="200,000 - 500,000 ETB">200,000 - 300,000 ETB</option>
                                        <option value="500,000+ ETB">500,000+ ETB</option>
                                       </select>
                                 </div>
                                 <div className="md:col-span-2">
                                    <label className="text-sm font-medium text-[#2B2B2B]">
                                        Event Location
                                    </label>
                                    <input 
                                         type="text"
                                         value={eventLocation}
                                         onChange={(event) => setEventLocation(event.target.value)}
                                         placeholder="Enter the event location"
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
                         <h2 className="text-xl font-semibold text-[#2B2B2B]">
                            Booking Request Submitted
                         </h2>
                         <p className="mt-2 text-sm text-gray-600">
                             We will check the availability of your selected vendors.
                         </p>
                         <div className="mt-6 space-y-3 text-sm text-gray-600">
                            <p>
                                <span className="font-medium text-[#2B2B2B]">Name:</span>{" "}
                                {clientName}
                            </p>
                            <p>
                                <span className="font-medium text-[#2B2B2B]">Phone:</span>{" "}
                                {phoneNumber}
                            </p>
                            <p>
                                <span className="font-mediumbtext-[#2B2B2B]">Event Type:</span>{" "}
                                {eventType}
                            </p>
                            <p>
                                <span className="font-medium text-[#2B2B2B]">Event Date:</span>{" "}
                                {eventDate}
                            </p>
                            <p>
                                <span className="font-medium text-[#2B2B2B]">Guests:</span>{" "}
                                {guestCount || "Not provided"}
                            </p>
                            <p>
                                <span className="font-medium text-[#2B2B2B]">Budget:</span>{" "}
                                {budget || "Not provided"}
                            </p>
                            <p>
                                <span className="font-medium text-[#2B2B2B]">
                                    Selected Vendors:
                                </span>{" "}
                                {selectedVendors.join(", ")}
                            </p>
                            {message && (
                                <p>
                                    <span className="font-medium text-[#2B2B2B]">
                                        Message:
                                    </span>{" "}
                                    {message}
                                </p>
                            )}
                         </div>
                      </div>
)}
                </div>
            </div>
        </main>
    );
}

