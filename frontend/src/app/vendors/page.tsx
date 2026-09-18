const vendors = [
    {
        name: "Luna Photography",
        category: "Photography",
        location: "Addis Ababa",
    },
    {
        name: "Elegant Events",
        category: "Decoration",
        location: "Addis Ababa",
    },
    {
        name: "Grand Garden Venue",
        category: "Venue",
        location: "Addis Ababa",
    },
    {
        name: "Bella Beauty",
        category: "Makeup & Hair",
        location: "Addis Ababa",
    },
    {
        name: "Sweet Moments",
        category: "Cakes",
        location: "Addis Ababa",
    },
    {
        name: "Melody Events",
        category: "Music &DJ",
        location: "Addis Ababa",
    },
];

export default function VendorsPage() {
    return (
        <main className="min-h-screen bg-[#FAF9F6] px-8 py-16">
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Find Your Vendors
                    </p>
                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Wedding & Event Vendors
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-gray-600">
                        Explore trusted vendors and find the right professionals for your special day.
                    </p>
                </div>
                <div className="mt-12 flex flex-col gap-4 md:flex-row">
                    <input 
                      type="text" 
                      placeholder="Search vendors..." 
                      className="flex-1 rounded-full border border-[#E8E1CC] bg-white px-5 py-3 outline-none focus:border-[#C9A227]" 
                      />
                    <select className="rounded-full border border-[#E8E1CC] bg-white px-5 py-3 outline-none focus:border-[#C9A227]">
                        <option>All Categories</option>
                        <option>Photography</option>
                        <option>Videography</option>
                        <option>Decoration</option>
                        <option>Venues</option>
                        <option>Wedding Dresses</option>
                        <option>Makeup & Hair</option>
                        <option>Music & DJ</option>
                        <option>Cakes</option>
                    </select>
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {vendors.map((vendor) => (
                        <div 
                            key={vendor.name} 
                            className="overflow-hidden rounded-2xl border border-[#E8E1CC] bg-white shadow-sm hover:shadow-md">
                            <div className="flex h-48 items-center justify-center bg-[#F3EEDC]">
                                <span className="text-gray-500">
                                    Vendor Image
                                </span>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-[#C9A227]">
                                    {vendor.category}
                                </p>
                                <h2 className="mt-1 text-xl font-semibold text-[#2B2B2B]">
                                    {vendor.name}
                                </h2>
                                <p className="mt-2 text-sm text-gray-500">
                                    📍 {vendor.location}
                                </p>
                                <button className="mt-5 w-full rounded-full border border-[#C9A227] py-2 text-[#C9a227] hover:bg-[#FAF9F6]">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}