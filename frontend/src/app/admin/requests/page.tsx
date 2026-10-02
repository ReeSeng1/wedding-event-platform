export default function AdminRequestPage() {
    return (
        <main className="min-h-screen bg-[#F9F7F0] px-6 py-16">
            <div className="mx-auto max-w-5xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Admin Panel
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Client Requests
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-gray-600">
                        Review client requests and manage vendor availability.
                    </p>
                </div>
                <div className="mt-10 rounded-2xl border border-[#E8E1CC] bg-white p-8 text-center shadow-sm">
                    <h2 className="text-xl font-bold text-[#2B2B2B]">
                        No Requests Yet
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Client booking requests will appear here.
                    </p>
                </div>
            </div>
        </main>
    );
}