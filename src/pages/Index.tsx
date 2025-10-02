import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import AboutSection from "@/components/AboutSection";
import WhyUsSection from "@/components/WhyUsSection";
import CoursesSection from "@/components/CoursesSection";
import FantasyMascotSection from "@/components/FantasyMascotSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import LearningProcessSection from "@/components/LearningProcessSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactFormSection from "@/components/ContactFormSection";
import Footer from "@/components/Footer";

type User = {
  id: number;
  name: string;
  avatar: string;
};

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const userId = window.localStorage.getItem("userId");
    if (!userId) {
      setUser(null);
      return;
    }

    let isMounted = true;

    fetch(`http://localhost:8000/users/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setUser(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setUser(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection user={user ?? undefined} />
      <MarqueeSection />
      <AboutSection />
      <WhyUsSection />
      <CoursesSection />
      <FantasyMascotSection />
      <HowItWorksSection />
      <LearningProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactFormSection />
      <Footer />
    </div>
  );
};

export default Index;
