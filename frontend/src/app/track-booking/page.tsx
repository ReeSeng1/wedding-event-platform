
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

interface Booking {
    id: string;
    phoneNumber: string;
    eventType: string;
    eventDate: string;
    status: "Pending" | "Approved" | "Rejected";
    createdAt: string;
}

export default function TrackBookingPage() {
    const searchParams = useSearchParams();
    const [bookingId, setBookingId] = useState(searchParams.get("bookingId") || "");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [booking, setBooking] = useState<Booking | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleTrackBooking(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setError("");
        setBooking(null);
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/requests/track",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        bookingId: bookingId.trim(),
                        phoneNumber: phoneNumber.trim(),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to find your booking.");
            }

            setBooking(data.booking);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    const statusStyles = {
        Pending: "bg-yellow-100 text-yellow-800",
        Approved: "bg-green-100 text-green-800",
        Rejected: "bg-red-100 text-red-800",
    };

    return (
        <main className="min-h-screen bg-[#FAF9F6] px-6 py-16">
            <div className="mx-auto max-w-2xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        EverAfter
                    </p>

                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Track Your Booking
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Enter your booking reference and phone number
                        to check the latest status of your request.
                    </p>
                </div>

                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 shadow-sm">
                    <form onSubmit={handleTrackBooking}>
                        <div>
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Booking Reference
                            </label>

                            <input
                                type="text"
                                value={bookingId}
                                onChange={(e) => setBookingId(e.target.value)}
                                placeholder="Enter your booking reference"
                                required
                                className="mt-2 w-full rounded-xl border border-[#E8E1CC] px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]"
                            />
                        </div>

                        <div className="mt-5">
                            <label className="text-sm font-medium text-[#2B2B2B]">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter your booking phone number"
                                required
                                className="mt-2 w-full rounded-xl border border-[#E8E1CC] px-4 py-3 text-[#2B2B2B] outline-none focus:border-[#C9A227]"
                            />
                        </div>

                        {error && (
                            <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-7 w-full rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white transition hover:bg-[#B08D20] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Checking..." : "Track Booking"}
                        </button>
                    </form>
                </div>

                {booking && (
                    <div className="mt-8 rounded-2xl border border-[#E8E1CC] bg-white p-8 shadow-sm">
                        <h2 className="text-xl font-semibold text-[#2B2B2B]">
                            Your Booking Details
                        </h2>

                        <div className="mt-6 space-y-4 text-[#2B2B2B]">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Booking Reference
                                </p>
                                <p className="break-all font-medium">
                                    {booking.id}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Event Type
                                </p>
                                <p className="font-medium">
                                    {booking.eventType}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Event Date
                                </p>
                                <p className="font-medium">
                                    {booking.eventDate}
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    Booking Status
                                </p>

                                <span
                                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                                        statusStyles[booking.status] ||
                                        "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    {booking.status}
                                </span>
                            </div>
                        </div>

                        <p className="mt-6 text-sm text-gray-500">
                            Your booking status reflects the latest
                            decision recorded by EverAfter.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
