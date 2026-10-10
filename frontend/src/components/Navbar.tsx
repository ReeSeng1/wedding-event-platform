export default function Navbar() {
    return (
        <nav className="border-b border-[#E8E1CC] bg-white px-8 py-5">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <h2 className="text-2xl font-bold text-[#C9A227]">EverAfter</h2>

                <div className="flex items-center gap-8">
                  <a href="/" className="text-gray-700 hover:text-[#C9A227]">Home</a>
                  <a href="/vendors/login" className="text-gray-700 hover:text-[#C9A227]">Vendors</a>
                  <a href="/how-it-works" className="text-gray-700 hover:text-[#C9A227]">How It Works</a>
                  <a href="/about" className="text-gray-700 hover:text-[#C9A227]">About</a>
                  <a href="/find-vendors" className="text-gray-700 hover:text-[#C9A227]">Find Vendors</a>
                  <a href="/admin" className="text-gray-700 hover:text-[#C9A227]">Admin</a>
                </div>
            </div>
            
        </nav>
    );
}