export default function Footer() {
    return (
        <footer className="bg-[#2B2B2B] px-8 py-12 text-white">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-10 md:grid-cols-3">
                    <div>
                        <h2 className="text-2xl font-bold text-[#C9A227]">
                            EverAfter
                        </h2>
                        <p className="mt-4 max-w-sm text-sm leading-6 text-gray-300">
                            Making your wedding planning journey simple, beautiful, and unforgettable.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold">
                            Quick Links
                        </h3>
                        <div className="mt-4 flex flex-col gap-3 text-sm text-gray-300">
                            <a href="/" className="hover:text-[#C9A227]">Home</a>
                            <a href="/find-vendors" className="hover:text-[#C9A227]">Find Vendors</a>
                            <a href="/vendors" className="hover:text-[#C9A227]">For Vendors</a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold">
                            Contact
                        </h3>
                        <div className="mt-4 space-y-3 text-sm text-gray-300">
                            <p>Email: hello@everafter.com</p>
                            <p>Phone: +251 900 000 000</p>
                            <p>Addis Ababa, Ethiopia</p>
                        </div>
                    </div>
                </div>
                <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
                    © 2026 EverAfter. All rights reserved.
                </div>
            </div>
        </footer>
    );
}