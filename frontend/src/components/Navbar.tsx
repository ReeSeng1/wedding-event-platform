export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-5">
            <h2 className="text-2xl font-bold">EverAfter</h2>

            <div className="flex items-center gap-8">
                <a href="/" className="text-gray-700 hover:text-black">Home</a>
                <a href="/vendors" className="text-gray-700 hover:text-black">Vendors</a>
                <a href="/how-it-works" className="text-gray-700 hover:text-black">How It Works</a>
                <a href="/about" className="text-gray-700 hover:text-black">About</a>
                <a href="/find-vendors" className="rounded-full bg-black px-5 py-3 text-white hover:bg gray-800">Find Vendors</a>
            </div>
        </nav>
    );
}