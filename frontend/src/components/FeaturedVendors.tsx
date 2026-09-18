const vendors =[
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
];

export default function FeatureVendors() {
    return (
        <section className="bg-gray-50 px-8 py-20">
            <div className="mx-auto max-w-6xl">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-bold">
                            Featured Vendors
                        </h2>
                        <p className="mt-3 text-gray-600">
                            Discover vendors who can help make your special day memorable
                        </p>
                    </div>
                    <a 
                       href="/vendors" 
                       className="hidden rounded-full border border-gray-300 px-5 py-2 hover:bg-white sm:block">
                        View All
                    </a>
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {vendors.map((vendor) => (
                        <div key={vendor.name} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                            <div className="flex h-48 items-center justify-center bg-gray-200">
                                <span className="text-gray-500">
                                    Vendor Image
                                </span>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-gray-500">
                                    {vendor.category}
                                </p>
                                <h3 className="mt-1 text-xl font-semibold">
                                    {vendor.name}
                                </h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    📍{vendor.location}
                                </p>
                                <button className="mt-5 w-full rounded-full border border-gray-300 py-2 hover:bg-gray-100">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}