"use client";

import { useRouter } from "next/navigation";
import { useVendorSelection } from "@/components/VendorSelectionContext";
import Link from "next/link";

const photographyVendors = [
    {
        id: "1",
        name: "Luna Photography",
        location:"Addis Ababa",
        image:"/images/vendors/luna-photography.png",
    },
    {
        id: "2",
        name: "Ethiopian Moments Photography",
        location:"Addis Ababa",
        image:"/images/vendors/ethiopian-moments.png",
    },
    {
        id: "3",
        name: "Golden Frame Photography",
        location: "Addis Ababa",
        image:"/images/vendors/golden-frame.png"
    },
];
const videographyVendors = [
    {
        id: "1",
        name: "Everlasting Films",
        location: "Addis Ababa",
        image:"/images/vendors/everlasting-films-videography.png",
    },
    {
        id: "2",
        name: "Golden Moments Studio",
        location: "Addis Ababa",
        image:"/images/vendors/golden-moments-studio-videography.png",
    },
    {
        id: "3",
        name: "Dream Wedding Films",
        location: "Addis Ababa",
        image:"/images/vendors/dream-wedding-films-videography.png",
    },
];
const dressVendors =[
    {
        id: "1",
        name: "Bridal Elegance",
        location: "Addis Ababa",
        image:"/images/vendors/bridal-elegance.png",
    },
    {
        id: "2",
        name: "Royal Bridal Boutique",
        location: "Addis Ababa",
        image:"/images/vendors/royal-bridal-boutique.png",
    },
    {
        id: "3",
        name: "Dream Dress Studio",
        location: "Addis Ababa",
        image:"/images/vendors/dream-dress-studio.png",
    },
];
const musicVendors = [
    {
        id: "1",
        name: "Ethiopian Wedding DJs",
        location: "Addis Ababa",
        image:"/images/vendors/ethiopian-wedding-djs.png",
    },
    {
        id: "2",
        name: "Golden Sound Events",
        location: "Addis Ababa",
        image:"/images/vendors/golden-sound-events.png",
    },
    {
        id: "3",
        name: "Royal Beats DJ",
        location: "Addis Ababa",
        image:"/images/vendors/royal-beats.png",
    },
];
const decorationVendors = [
    {
        id:"1",
        name: "Elegant Events",
        location: "Addis Ababa",
        image:"/images/vendors/elegant-events.png",
    },
    {
        id: "2",
        name: "Royal Decor",
        location: "Addis Ababa",
        image:"/images/vendors/royal-decor.png",
    },
    {
        id: "3",
        name: "Dream Wedding Decor",
        location: "Addis Ababa",
        image:"/images/vendors/dream-wedding-decor.png",
    },
];
const venueVendors = [
    {
        id: "1",
        name: "Grand Garden Venue",
        location: "Addis Ababa",
        image:"/images/vendors/grand-garden-venue.png",
    },
    {
        id: "2",
        name: "Royal Palace Venue",
        location: "Addis Ababa",
        image:"/images/vendors/royal-palace-venue.png",
    },
    {
        id: "3",
        name: "Green Valley Events Venue",
        location: "Addis Ababa",
        image:"/images/vendors/green-valley-events-venue.png",
    },
];
const makeupVendors = [
    {
        id: "1",
        name: "Bella Beauty",
        location: "Addis Ababa",
        image:"/images/vendors/bella-beauty.png",
    },
    {
        id: "2",
        name: "Glow Beauty Studio",
        location: "Addis Ababa",
        image:"/images/vendors/glow-beauty-studio.png",
    },
    {
        id: "3",
        name: "Royal Beauty",
        location: "Addis Ababa",
        image:"/images/vendors/royal-beauty.png",
    },
];
const cakeVendors = [
    {
        id: "1",
        name: "Sweet Moments Cakes",
        location: "Addis Ababa",
        image:"/images/vendors/sweet-moments-cake.png",
    },
    {
        id: "2",
        name: "Royal Cake House",
        location: "Addis Ababa",
        image:"/images/vendors/royal-cake-house.png",
    },
    {
        id: "3",
        name: "Elegant Wedding Cakes",
        location: "Addis Ababa",
        image:"/images/vendors/elegant-wedding-cake.png",
    },
];
export default function FindVendorsPage() {
    const router = useRouter();
    const { selections } = useVendorSelection();

    return (
        <main className="min-h-screen bg-[#FAF9F6] px-8 py-16">
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                        Start Planning
                    </p>

                    <h1 className="mt-4 text-4xl font-bold text-[#2B2B2B]">
                        Build Your Wedding Plan
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Choose the vendors you need for your special day and build
                        your personalized wedding plan.
                    </p>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="relative h-64 overflow-hidden rounded-2xl border border-[#E8E1CC] bg-cover bg-center p-6 text-center">
                        <img src="/images/photography.png" alt="Photography" className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
                            <h2 className="text-lg font-semibold text-white">
                                Photography
                            </h2>

                            <p className="mt-2 text-sm text-white">
                                Find photographers for your special moments.
                            </p>

                            <Link
                                href="/find-vendors/photography"
                                className="mt-5 rounded-full border border-white px-5 py-2 text-white hover:bg-white/20"
                            >
                                View Vendors
                            </Link>
                        </div>
                        </div>
                        <div className="relative h-64 overflow-hidden rounded-2xl border border-[#E8E1CC]">
                        <img src="/images/decoration.png" alt="Decoration" className="absolute inset-0 h-full w-full object-cover"/>
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
                            <h2 className="text-lg font-semibold text-white">
                                Decoration
                            </h2>

                            <p className="mt-2 text-sm text-white">
                                Find decorators to create your perfect setting.
                            </p>

                            <Link
                                href="/find-vendors/decoration"
                                className="mt-5 rounded-full border border-white px-5 py-2 text-white hover:bg-white/20"
                            >
                                View Vendors
                            </Link>
                        </div>
                        </div>
                        <div className="relative h-64 overflow-hidden rounded-2xl border border-[#E8E1CC]">
                        <img src="/images/venue.png" alt="Venues" className="absolute inset-0 h-full w-full object-cover"/>
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
                            <h2 className="text-lg font-semibold text-white">
                                Venues
                            </h2>

                            <p className="mt-2 text-sm text-white">
                                Find a venue that fits your event.
                            </p>

                            <Link
                                href="/find-vendors/venues"
                                className="mt-5 rounded-full border border-white px-5 py-2 text-white hover:bg-white/20"
                            >
                                View Vendors
                            </Link>
                        </div>
                        </div>
                        <div className="relative h-64 overflow-hidden rounded-2xl border border-[#E8E1CC]">
                         <img src="/images/makeup.png" alt="Makeup & Hair" className="absolute inset-0 h-full w-full object-cover"/>   
                         <div className="absolute inset-0 bg-black/40"></div> 
                        <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
                            <h2 className="text-lg font-semibold text-white">
                                Makeup & Hair
                            </h2>

                            <p className="mt-2 text-sm text-white">
                                Find beauty professionals for your event.
                            </p>

                            <Link
                                href="/find-vendors/makeup"
                                className="mt-5 rounded-full border border-white px-5 py-2 text-white hover:bg-white/20"
                            >
                                View Vendors
                            </Link>
                        </div>
                        </div>
                    <div className="relative h-64 overflow-hidden rounded-2xl border border-[#E8E1CC]">    
                    <img src="/images/videography.png" alt="Videography" className="absolute inset-0 h-full w-full object-cover"/>
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
                        <h2 className="text-lg font-semibold text-white">
                            Videography
                        </h2>
                        <p className="mt-2 text-sm text-white">
                            Find Videographers to capture your special moments.
                        </p>
                        <Link
                            href="/find-vendors/videography"
                            className="mt-5 rounded-full border border-white px-5 py-2 text-white hover:bg-white/20">
                                View Vendors
                            </Link>
                    </div>
                    </div>
                    <div className="relative h-64 overflow-hidden rounded-2xl border border-[#E8E1CC]">
                    <img src="/images/wedding-dress.png" alt="Wedding Dresses" className="absolute inset-0 h-full w-full object-cover"/>
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
                        <h2 className="text-lg font-semibold text-white">
                            Wedding Dresses
                        </h2>
                        <p className="mt-2 text-sm text-white">
                            Find beautiful wedding dresses for your special day.
                        </p>
                        <Link
                           href="/find-vendors/wedding-dresses"
                           className="mt-5 rounded-full border border-white px-5 py-2 text-white hover:bg-white/20">
                            View Vendors
                           </Link>
                    </div>
                    </div>
                    <div className="relative h-64 overflow-hidden rounded-2xl border border-[#E8E1CC]">
                    <img src="/images/music.png" alt="Music & DJ" className="absolute inset-0 h-full w-full object-cover"/>
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
                        <h2 className="text-lg font-semibold text-white">
                            Music & DJ
                        </h2>
                        <p className="mt-2 text-sm text-white">
                            Find DJs and music services for your special day.
                        </p>
                        <Link
                           href="/find-vendors/music"
                           className="mt-5 rounded-full border border-white px-5 py-2 text-white hover:bg-white/20">
                            View Vendors
                           </Link>
                    </div>
                    </div>
                    <div className="relative h-64 overflow-hidden rounded-2xl border border-[#E8E1CC]">
                    <img src="/images/cake.png" alt="Cakes" className="absolute inset-0 h-full w-full object-cover"/>
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
                        <h2 className="text-lg font-semibold text-white">
                            Cakes
                        </h2>
                        <p className="mt-2 text-sm text-white">
                            Find beautiful cakes for your special day.
                        </p>
                        <Link 
                            href="find-vendors/cakes"
                            className="mt-5 rounded-full border border-white px-5 py-2 text-white hover:bg-white/20">
                                View Vendors
                            </Link>
                    </div>
                    </div>
                    </div>
                    <Link href="/selected-vendors"
                       className="mt-20 block w-full rounded-full bg-[#C9A227] px-6 py-3 text-center font-medium text-white hover:bg-[#B008D20]" >
                        Review Selected Vendors
                    </Link>
                    </div>
                    <button 
                        onClick={() => router.push("/event-details")}
                        disabled={Object.values(selections).every(
                            (vendor) => vendor === ""
                        )}
                        className="mt-10 w-full rounded-full bg-[#C9A227] px-6 py-3 font-medium text-white hover:bg-[#B08D20] disabled:cursor-not-allowed disabled:opacity-50">
                        Continue to Event Details
                    </button>
            </div>
        </main>
    );
}

