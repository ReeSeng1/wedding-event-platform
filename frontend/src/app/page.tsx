import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VendorCategories from "@/components/VendorCategories";
import FeatureVendors from "@/components/FeaturedVendors";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <VendorCategories />
      <FeatureVendors />

      <h1>Wedding & Event Planning</h1>
      <p>Plan your special day with the right vendors.</p>
    </main>
  );
}