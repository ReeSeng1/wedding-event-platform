export default function BookingSuccessPage() {
    return (
        <main className="min-h-screen bg-[#FAF9F6] px-6 py-16">
            <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                    EverAfter
                </p>
                <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                    Booking Request Sent
                </h1>
                <p className="mt-6 text-gray-600">
                    Your booking request has been sent to the selected vendor.
                    We will check their availability and contact you with an update.
                </p>
                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 shadow-sm">
                    <p className="text-lg font-semibold text-[#2B2B2B]">
                        Thank you for choosing EverAfter.
                    </p>
                    <p className="mt-3 text-gray-600">
                        Your request is currently pending.
                    </p>
                </div>
            </div>
        </main>
    );
}