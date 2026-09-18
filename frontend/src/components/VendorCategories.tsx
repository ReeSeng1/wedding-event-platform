const categories = [
    "Photography",
    "Videography",
    "Decoration",
    "Venues",
    "Wedding Dresses",
    "Makeup & Hair",
    "Music & DJ",
    "Cakes",
];
export default function VendorCategories() {
    return (
        <section className="bg-white px-8 py-20">
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#2B2B2B]">
                        Everything trusted vendors across different wedding and event categories.
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Explore trusted vendors across different wedding and event categories.
                    </p>
                </div>
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) =>(
                        <div key={category}
                        className="rounded-2xl border border-[#E8E1CC] bg-[#FAF9F6] p-6 text-center hover:border-[#C9A227] hover:shadow-md">
                            <h3 className="text-lg font-semibold text-[#2B2B2B]">{category}</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Explore {category.toLowerCase()}vendors
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}