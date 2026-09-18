export default function Hero() {
    return(
        <section className="bg-[#FAF9F6] px-8 py-24">
            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-5xl font-bold text-[#2B2B2B]">
                    Plan Your Perfect Wedding
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                    Discover trusted vendors and find everything you need to create your perfect wedding or event.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <a 
                    href="/find-vendors"
                    className="rounded-full bg-[#C9A227] px-6 py-3 text-white hover:bg-[#B08D20]">
                        Find Vendors</a>
                    <a href="/vendors" className="rounded-full border border-[#C9A227] px-6 py-3 text-[#C9A227] hover:bg-[#FAF9F6]">Browse Vendors</a>  
                </div>
            </div>
        </section>
    );
}