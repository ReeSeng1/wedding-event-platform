export default function Hero() {
    return(
        <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">
            <video 
               autoPlay
               loop
               muted
               playsInline
               className="absolute inset-0 h-full w-full object-cover">
                <source src="/videos/wedding-hero.mp4" type="video/mp4"/>
            </video>
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center px-8 py-24">
                <div className="max-w-4xl text-center text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.4em] tet-[#E8D9A8]">
                    EverAfter
                </p>
                <h1 className="mt-5 text-5xl font-bold md:text-7xl">
                    Your Perfect Day <br /> Starts Here
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">
                    Discover trusted wedding vendors and bring every beautiful details of your celebration together in one place.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                    <a 
                    href="/find-vendors"
                    className="rounded-full bg-[#C9A227] px-8 py-3 font-medium text-white hover:bg-[#B08D20]">
                        Find Vendors</a>
                    <a href="/vendors/login" className="rounded-full border border-white px-8 py-3 font-medium text-white hover:bg-white/10">Browse Vendors</a>  
                </div>
            </div>
          </div>
        </section>
    );
}