import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const TESTIMONIALS = [
  {
    name: "Алексей Петров",
    role: "Junior Python Developer",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    text: "За 3 месяца с нуля освоил Python и получил первую работу. Наставники действительно помогли разобраться во всех тонкостях.",
    rating: 5,
    company: "Tech Corp",
    salary: "от 80,000 ₽"
  },
  {
    name: "Мария Сидорова",
    role: "Frontend Developer",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    text: "Отличные курсы по веб-разработке! Особенно понравился индивидуальный подход и помощь с портфолио.",
    rating: 5,
    company: "StartupX",
    salary: "от 90,000 ₽"
  },
  {
    name: "Дмитрий Козлов",
    role: "Data Scientist",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    text: "Курс по Data Science превзошел ожидания. Много практики с реальными данными и проектами.",
    rating: 5,
    company: "DataLab",
    salary: "от 120,000 ₽"
  },
  {
    name: "Елена Волкова",
    role: "Full Stack Developer",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    text: "Невероятно структурированная программа! Изучила и фронтенд, и бэкенд. Теперь работаю в международной компании.",
    rating: 5,
    company: "GlobalTech",
    salary: "от 150,000 ₽"
  },
  {
    name: "Андрей Смирнов",
    role: "DevOps Engineer",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    text: "Курс DevOps дал мне возможность кардинально изменить карьеру. Отличные преподаватели и актуальные знания.",
    rating: 5,
    company: "CloudSys",
    salary: "от 130,000 ₽"
  },
  {
    name: "София Кузнецова",
    role: "UX/UI Designer",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    text: "Превосходное обучение дизайну! Научилась создавать красивые и функциональные интерфейсы. Портфолио помогло найти работу мечты.",
    rating: 5,
    company: "DesignHub",
    salary: "от 70,000 ₽"
  }
] as const;

const TestimonialsSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            TESTIMONIALS.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => prev.includes(index) ? prev : [...prev, index]);
              }, index * 150);
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

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 left-20 text-red-400/20 animate-pulse">
          <Star className="w-12 h-12 transform rotate-12" />
        </div>
        <div className="absolute bottom-20 right-20 text-red-400/20 animate-pulse delay-300">
          <Quote className="w-16 h-16 transform -rotate-12" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-200 mb-4">
            Отзывы студентов
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Узнайте, как наши выпускники изменили свою жизнь и построили успешную карьеру в IT
          </p>
        </div>

        {/* Featured testimonial carousel */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative bg-slate-800 rounded-3xl border-2 border-red-900/50 p-8 md:p-12 shadow-xl overflow-hidden">
            
            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-700 rounded-full border border-red-600/30 flex items-center justify-center text-red-400 hover:bg-red-900/20 hover:border-red-600 transition-all duration-300 hover:scale-110 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-700 rounded-full border border-red-600/30 flex items-center justify-center text-red-400 hover:bg-red-900/20 hover:border-red-600 transition-all duration-300 hover:scale-110 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Auto-play control */}
            <button
              onClick={toggleAutoPlay}
              className="absolute top-4 right-4 w-10 h-10 bg-slate-700 rounded-full border border-red-600/30 flex items-center justify-center text-red-400 hover:bg-red-900/20 transition-all duration-300 z-10"
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600 rounded-full animate-pulse delay-700"></div>
            </div>

            {/* Testimonials slider container */}
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${currentTestimonial * 100}%)`
                }}
              >
                {TESTIMONIALS.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    {/* Featured testimonial content */}
                    <div className="relative z-10 text-center">
                      <div className="mb-8">
                        <Quote className="w-16 h-16 text-red-400 mx-auto mb-6 opacity-50 transition-all duration-500" />
                        <div className="overflow-hidden">
                          <blockquote className="text-2xl md:text-3xl text-gray-200 leading-relaxed italic font-light mb-8">
                            "{testimonial.text}"
                          </blockquote>
                        </div>
                        
                        {/* Rating */}
                        <div className="flex items-center justify-center gap-1 mb-8">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={`${index}-${i}`}
                              className="h-6 w-6 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Author info */}
                      <div className="flex items-center justify-center gap-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-red-600 rounded-full blur-md opacity-30 transition-all duration-500"></div>
                          <img
                            src={testimonial.photo}
                            alt={testimonial.name}
                            className="relative w-20 h-20 rounded-full object-cover border-4 border-red-600/50 transition-all duration-500"
                          />
                        </div>
                        <div className="text-left">
                          <h4 className="text-2xl font-bold text-gray-200 mb-1 transition-all duration-300">
                            {testimonial.name}
                          </h4>
                          <p className="text-red-400 font-semibold mb-1 transition-all duration-300">
                            {testimonial.role}
                          </p>
                          <p className="text-gray-400 text-sm transition-all duration-300">
                            {testimonial.company} • {testimonial.salary}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-red-600 scale-125' 
                      : 'bg-slate-600 hover:bg-red-800'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Additional testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {TESTIMONIALS.slice(0, 6).map((testimonial, index) => {
            const isVisible = visibleCards.includes(index);
            const isFeatured = index === currentTestimonial;
            
            if (isFeatured) return null; // Don't show featured testimonial in grid
            
            return (
              <div
                key={index}
                className={`group transition-all duration-700 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card className="h-full bg-slate-800 border-2 border-red-900/50 hover:border-red-600/70 transition-all duration-500 hover:shadow-lg hover:shadow-red-900/20 hover:-translate-y-2 overflow-hidden cursor-pointer"
                      onClick={() => setCurrentTestimonial(index)}>
                  <CardContent className="p-6 h-full flex flex-col relative">
                    
                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 bg-red-600/5 transition-opacity duration-300 ${
                      hoveredCard === index ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                    
                    {/* Scan line effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-red-400/10 to-transparent transform transition-transform duration-1000 ${
                      hoveredCard === index ? 'translate-x-full' : '-translate-x-full'
                    }`}></div>
                    
                    {/* Quote icon */}
                    <Quote className="h-8 w-8 text-red-400/50 mb-4" />
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    
                    {/* Text */}
                    <blockquote className="text-gray-300 mb-6 leading-relaxed flex-grow relative z-10">
                      "{testimonial.text.substring(0, 120)}..."
                    </blockquote>
                    
                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-700 relative z-10">
                      <img
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-red-600/30"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-200 text-sm">
                          {testimonial.name}
                        </h4>
                        <p className="text-red-400 text-xs">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    
                    {/* Bottom accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-red-600 transform transition-all duration-300 ${
                      hoveredCard === index ? 'scale-x-100' : 'scale-x-0'
                    } origin-center`}></div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
        
        {/* Bottom stats */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-6 bg-slate-800 rounded-full px-8 py-4 border border-red-900/50">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-gray-300 font-semibold">4.9/5</span>
            </div>
            <div className="w-px h-6 bg-slate-600"></div>
            <span className="text-gray-400">1000+ выпускников</span>
            <div className="w-px h-6 bg-slate-600"></div>
            <span className="text-red-400 font-semibold">85% трудоустройство</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;