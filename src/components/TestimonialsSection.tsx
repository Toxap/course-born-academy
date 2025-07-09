import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const TestimonialsSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const testimonials = [
    {
      name: "Алексей Петров",
      role: "Junior Python Developer",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "За 3 месяца с нуля освоил Python и получил первую работу. Наставники действительно помогли разобраться во всех тонкостях.",
      rating: 5,
      company: "Tech Corp"
    },
    {
      name: "Мария Сидорова", 
      role: "Frontend Developer",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "Отличные курсы по веб-разработке! Особенно понравился индивидуальный подход и помощь с портфолио.",
      rating: 5,
      company: "StartupX"
    },
    {
      name: "Дмитрий Козлов",
      role: "Data Scientist", 
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "Курс по Data Science превзошел ожидания. Много практики с реальными данными и проектами.",
      rating: 5,
      company: "DataLab"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('[data-card]');
            cards.forEach((card, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(120,119,198,0.15),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(236,72,153,0.1),transparent_50%)]"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-primary/20">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-gray-300 font-medium">5.0 средний рейтинг</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
            Отзывы студентов
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Узнайте, как наши выпускники изменили свою жизнь и построили успешную карьеру в IT
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => {
            const isVisible = visibleCards.includes(index);
            
            return (
              <div
                key={index}
                data-card
                className={`group transition-all duration-700 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm border border-slate-600/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 group-hover:scale-[1.02]">
                  <CardContent className="p-8 h-full flex flex-col">
                    {/* Decorative quote */}
                    <div className="relative mb-6">
                      <Quote className="h-12 w-12 text-primary/30 absolute -top-2 -left-2" />
                      <Quote className="h-8 w-8 text-primary relative z-10" />
                    </div>
                    
                    {/* Rating stars */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 fill-yellow-400 text-yellow-400 transition-all duration-300 group-hover:scale-110`}
                          style={{ animationDelay: `${i * 100}ms` }}
                        />
                      ))}
                      <span className="ml-2 text-yellow-400 font-semibold text-sm">5.0</span>
                    </div>
                    
                    {/* Testimonial text */}
                    <blockquote className="text-gray-200 mb-8 leading-relaxed text-lg italic font-light flex-grow">
                      "{testimonial.text}"
                    </blockquote>
                    
                    {/* Author section */}
                    <div className="flex items-center gap-4 pt-6 border-t border-slate-600/50">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-sm opacity-50"></div>
                        <img
                          src={testimonial.photo}
                          alt={testimonial.name}
                          className="relative w-14 h-14 rounded-full object-cover border-2 border-slate-600 group-hover:border-primary/50 transition-all duration-300"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-white text-lg mb-1 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                          {testimonial.name}
                        </h4>
                        <p className="text-primary font-medium text-sm">
                          {testimonial.role}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none"></div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
        
        {/* Bottom decoration */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 text-gray-400">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-20"></div>
            <span className="text-sm font-medium">Более 1000+ успешных выпускников</span>
            <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;