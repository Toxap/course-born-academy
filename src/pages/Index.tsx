import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import AboutSection from "@/components/AboutSection";
import WhyUsSection from "@/components/WhyUsSection";
import CoursesSection from "@/components/CoursesSection";
import FantasyMascotSection from "@/components/FantasyMascotSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import LearningProcessSection from "@/components/LearningProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <WhyUsSection />
      <CoursesSection />
      <FantasyMascotSection />
      <HowItWorksSection />
      <LearningProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
