import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import WhyUsSection from "@/components/WhyUsSection";
import CoursesSection from "@/components/CoursesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MarqueeSection />
      <WhyUsSection />
      <CoursesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
