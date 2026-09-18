export default function Hero() {
    return(
        <section className="px-8 py-24">
            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-5xl font-bold">
                    Plan Your Perfect Wedding
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                    Discover trusted vendors and find everything you need to create your perfect wedding or event.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <a 
                    href="/find-vendors"
                    className="rounded-full bg-black px-6 py-3 text-white hover:bg-gray-800">
                        Find Vendors</a>
                    <a href="/vendors" className="rounded-full border-gray-300 px-6 py-3 hover:bg-gray-100">Browse Vendors</a>  
                </div>
            </div>
        </section>
    );
}