import { notFound } from "next/navigation";

interface Vendor {
    id: number;
    businessName: string;
    category: string;
    location: string;
    description: string;
    serviceName: string;
    serviceDescription: string;
    servicePrice: string;
    portfolioTitle: string;
    portfolioDescription: string;
    portfolioImage: string;
}

export default async function VendorProfilePage({
    params,
}: {
    params: Promise<{ id: string}>;
}) {
    const { id } = await params;
    let vendor: Vendor | null = null;
    try {
        const response = await fetch(`http://localhost:5000/api/vendors/public/${id}`, {
            cache: "no-store"
        });
        if (response.status === 404) {
            notFound();
        }
        if (!response.ok) {
            throw new Error("Failed to fetch vendor.");
        }
        const data = await response.json();
        vendor = data.vendor;
    } catch (error) {
        console.error("Unable to load vendor:", error);
        throw error;
    }
    if (!vendor) {
        notFound();
    }
    return (
        <main className="min-h-screen bg-[#FAF9F6] px-8 py-16">
            <div className="mx-auto max-w-5xl">
                <div className="overflow-hidden rounded-3xl border border-[#E8E1CC] bg-white">
                    <div className="flex h-72 items-center justify-center bg-[#F3EEDC]">
                        {vendor.portfolioImage ? (
                            <img src={vendor.portfolioImage} alt={vendor.businessName} className="h-full w-full object-cover"/>
                        ) : (
                            <span className="text-gray-500">
                                Vendor Image
                            </span>
                        )}
                    </div>
                    <div className="p-8">
                        <p className="text-sm font-semibold uppercase tracking-wider text-[#C9A227]">
                            {vendor.category}
                        </p>
                        <h1 className="mt-2 text-4xl font-bold text-[#2B2B2B]">
                            {vendor.businessName}
                        </h1>
                        <p className="mt-3 text-gray-500">
                            {vendor.location}
                        </p>
                        <p className="mt-6 max-w-3xl leading-7 text-gray-600">
                            {vendor.description}
                        </p>
                        {vendor.serviceName && (
                            <div className="mt-8 border-t border-[#E8E1CC] pt-6">
                                <h2 className="text-2xl font-semibold text-[#2B2B2B]">
                                    {vendor.serviceName}
                                </h2>
                                <p className="mt-3 text-gray-600">
                                    {vendor.serviceDescription}
                                </p>
                                {vendor.servicePrice && (
                                    <p className="mt-3 font-semibold text-[#C9A227]">
                                        Price: {vendor.servicePrice}
                                    </p>
                                )}
                            </div>
                        )}
                        {vendor.portfolioTitle && (
                            <div className="mt-8 border-t border-[#E8E1CC] pt-6">
                                <h2 className="text-2xl font-semibold text-[#2B2B2B]">
                                    {vendor.portfolioTitle}
                                </h2>
                                <p className="mt-3 text-gray-600">
                                    {vendor.portfolioDescription}
                                </p>
                            </div>
                        )}
                        <button className="mt-8 rounded-full bg-[#C9A227] px-7 py-3 font-medium text-white hover:bg-[#B08D20]">
                            Add to My Wedding Plan
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}