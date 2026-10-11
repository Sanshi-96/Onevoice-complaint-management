import Navbar from "../../components/Navbar";
import HeroSection from "./sections/HeroSection";
import ProgressSection from "./sections/ProgressSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import SosSection from "./sections/SosSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import FAQSection from "./sections/FAQSection";
import CTASection from "./sections/CTASection";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, [location]);
  
  return (
    <div className="min-h-screen bg-softBg font-lato pt-[64px]">
      <Navbar />
      <HeroSection />
      <ProgressSection />
      <HowItWorksSection />
      <SosSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
    
  );
};

export default Home;