import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VendorCategories from "@/components/VendorCategories";
import FeatureVendors from "@/components/FeaturedVendors";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <VendorCategories />
      <FeatureVendors />
      <HowItWorks />
    </main>
  );
}