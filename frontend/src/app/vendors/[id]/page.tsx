export default function VendorProfilePage() {
    return(
        <main className="min-h-screen bg-[#FAF9F6] px-8 py-16">
            <div className="mx-auto max-w-5xl">
                <div className="overflow-hidden rounded-3xl border border-[#E8E1CC] bg-white">
                    <div className="flex h-72 items-center justify-center bg-[#F3EEDC]">
                        <span className="text-gray-500">
                            Vendor Image
                        </span>
                    </div>
                    <div className="p-8">
                        <p className="text-sm font-semibold uppercase tracking-wider text-[#C9A227]">
                            Photography
                        </p>
                        <h1 className="mt-2 text-4xl font-bold text-[#2B2B2B]">
                            Luna Photography
                        </h1>
                        <p className="mt-3 text-gray-500">
                            📍 Addis Ababa
                        </p>
                        <p className="mt-6 max-w-3xl leading-7 text-gray-600">
                            Professional wedding photography servives for couples who want to capture their special moments.
                        </p>
                        <button className="mt-8 rounded-full bg-[#C9A227] px-7 py-3 font-medium text-white hover:bg[#B08D20]">
                            Add to My Wedding Plan
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}