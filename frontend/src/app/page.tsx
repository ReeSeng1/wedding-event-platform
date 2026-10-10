import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutSection />
      <WhyChooseUs />
      <HowItWorks />
      <CTASection />
      <Footer/>
    </main>
  );
}