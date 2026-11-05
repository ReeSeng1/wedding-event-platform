"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function BookingSuccessPage() {
    const searchParams = useSearchParams();
    const bookingId = searchParams.get("id");
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#FAF9F6] px-6 py-16">
            <div className="mx-auto w-full max-w-2xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                    EverAfter
                </p>
                <div className="mx-auto mt-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#E8E1CC]">
                    <svg
                      className="h-10 w-10 text-[#9B7B20]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 1314 4L19 7"/>
                    </svg>
                </div>
                <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                    Request Submitted Successfully!
                </h1>
                <p className="mx-auto mt-4 max-w-lg text-gray-600">
                    Thank you for choosing EverAfter. Your booking request has been successfully submitted.
                </p>
                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 text-left shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-lg font-semibold text-[#2B2B2B]">
                            Booking Request Status
                        </h2>
                        <span className="rounded-full bg-[#FFF4D6] px-4 py-1.5 text-sm font-semibold text-[#9B7B20]">
                            Pending
                        </span>
                    </div>
                    {bookingId && (
                        <div className="mt-5 rounded-xl bg-[#FAF9F6] p-4">
                            <p className="text-sm text-gray-500">
                                Your Booking Reference
                            </p>
                            <p className="mt-1 break-all font-semibold text-[#2B2B2B]">
                                {bookingId}
                            </p>
                        </div>
                    )}
                    <div className="mt-6 border-t border-[#E8E1CC] pt-6">
                        <h3 className="font-semibold text-[#2B2B2B]">
                            What happens next?
                        </h3>
                        <div className="mt-5 space-y-5">
                            <div className="flex gap-4">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8E1CC] font-semiboold text-[#9B7B20]">
                                    1
                                </div>
                                <div>
                                    <p className="font-medium text-[#2B2B2B]">
                                        Request received
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Your booking request has been submitted.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8E1CC] font-semiboold text-[#9B7B20]">
                                    2
                                </div>
                                <div>
                                    <p className="font-medium text-[#2B2B2B]">
                                        Availability check
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        The EverAfter team will check the vendor's availability.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8E1CC] font-semiboold text-[#9B7B20]">
                                    3
                                </div>
                                <div>
                                    <p className="font-medium text-[#2B2B2B]">
                                        Confirmation and update
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        We will contact you with an update about your request.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="mt-8 text-gray-600">
                    We are excited to be part of your special day!
                </p>
                {bookingId && (
                    <Link
                       href={`/track-booking?bookingId=${encodeURIComponent(bookingId)}`}
                       className="inline-block rounded-full bg-[#C9A227] px-10 py-3 font-semibold text-white transition hover:bg-[#AE8B1F]">
                       Track My Booking
                    </Link>
                )}
                <Link
                  href="/"
                  className="mt-8 inline-block rounded-full bg-[#C9A227] px-10 py-3 font-semibold text-white transition hover:bg-[#AE8B1F]">
                   Back to Homepage
                </Link>
                <p className="mt-8 text-xs text-gray-400">
                    Made with care by EverAfter
                </p>
            </div>
        </main>
    );
}