import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
  Zap,
  Star,
  BookOpen,
  Code
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const COURSES = [
  "Python разработка",
  "Frontend разработка",
  "Full Stack разработка",
  "Data Science",
  "DevOps",
  "UX/UI Design"
] as const;

const ContactFormSection = () => {
  const [visibleElements, setVisibleElements] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const animationTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          if (animationTimeoutsRef.current.length === 0) {
            [0, 1, 2, 3].forEach((index) => {
              const timeoutId = window.setTimeout(() => {
                setVisibleElements(prev => (prev.includes(index) ? prev : [...prev, index]));
              }, index * 200);

              animationTimeoutsRef.current.push(timeoutId);
            });
          }

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      observer.disconnect();
      animationTimeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
      animationTimeoutsRef.current = [];
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Симуляция отправки формы
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });

    // Сброс формы через 3 секунды
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        message: ""
      });
      resetTimeoutRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
    };
  }, []);

  return (
    <section id="contact-form" ref={sectionRef} className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-20 left-20 text-red-400/20 animate-pulse">
          <Send className="w-16 h-16 transform rotate-12" />
        </div>
        <div className="absolute bottom-20 right-20 text-red-400/20 animate-pulse delay-700">
          <MessageSquare className="w-12 h-12 transform -rotate-12" />
        </div>
        
        {/* Floating pattern elements */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-red-600/5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-red-400/5 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 
            className={`text-4xl md:text-5xl font-bold text-gray-200 mb-4 transition-all duration-700 ease-out ${
              visibleElements.includes(0) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            Начните свой путь в IT
          </h2>
          <div 
            className={`w-24 h-1 bg-red-600 mx-auto mb-6 rounded-full transition-all duration-700 ease-out ${
              visibleElements.includes(0) 
                ? 'opacity-100 scale-x-100' 
                : 'opacity-0 scale-x-0'
            }`}
            style={{ transitionDelay: "200ms" }}
          ></div>
          <p 
            className={`text-xl text-gray-400 max-w-3xl mx-auto transition-all duration-700 ease-out ${
              visibleElements.includes(0) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            Оставьте заявку и получите персональную консультацию по выбору курса
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Form */}
          <div 
            className={`transition-all duration-700 ease-out ${
              visibleElements.includes(1) 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <Card className="bg-slate-800 border-2 border-red-900/50 hover:border-red-600/70 transition-all duration-500 overflow-hidden relative">
              <CardContent className="p-8">
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-red-600/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Scan line effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/10 to-transparent transform -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>

                <div className="relative z-10">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-red-900/20 border border-red-600/30 rounded-full px-4 py-2">
                          <Zap className="w-5 h-5 text-red-400" />
                          <span className="text-red-400 font-semibold">Бесплатная консультация</span>
                        </div>
                      </div>

                      {/* Name field */}
                      <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                          <User className="w-5 h-5 text-red-400/70 group-focus-within:text-red-400 transition-colors" />
                        </div>
                        <Input
                          type="text"
                          placeholder="Ваше имя"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                          className="pl-12 h-12 bg-slate-700 border-red-900/50 text-gray-200 placeholder:text-gray-500 focus:border-red-600 focus:ring-red-600/20 transition-all"
                        />
                      </div>

                      {/* Email field */}
                      <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                          <Mail className="w-5 h-5 text-red-400/70 group-focus-within:text-red-400 transition-colors" />
                        </div>
                        <Input
                          type="email"
                          placeholder="Ваш email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="pl-12 h-12 bg-slate-700 border-red-900/50 text-gray-200 placeholder:text-gray-500 focus:border-red-600 focus:ring-red-600/20 transition-all"
                        />
                      </div>

                      {/* Phone field */}
                      <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                          <Phone className="w-5 h-5 text-red-400/70 group-focus-within:text-red-400 transition-colors" />
                        </div>
                        <Input
                          type="tel"
                          placeholder="Номер телефона"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                          className="pl-12 h-12 bg-slate-700 border-red-900/50 text-gray-200 placeholder:text-gray-500 focus:border-red-600 focus:ring-red-600/20 transition-all"
                        />
                      </div>

                      {/* Course selection */}
                      <div className="relative group">
                        <div className="absolute left-3 top-4 z-10">
                          <BookOpen className="w-5 h-5 text-red-400/70 group-focus-within:text-red-400 transition-colors" />
                        </div>
                        <select
                          value={formData.course}
                          onChange={(e) => handleInputChange("course", e.target.value)}
                          required
                          className="w-full pl-12 h-12 bg-slate-700 border border-red-900/50 rounded-md text-gray-200 focus:border-red-600 focus:ring-1 focus:ring-red-600/20 transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Выберите курс</option>
                          {COURSES.map((course, index) => (
                            <option key={index} value={course} className="bg-slate-700">
                              {course}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message field */}
                      <div className="relative group">
                        <div className="absolute left-3 top-4 z-10">
                          <MessageSquare className="w-5 h-5 text-red-400/70 group-focus-within:text-red-400 transition-colors" />
                        </div>
                        <Textarea
                          placeholder="Расскажите о ваших целях и опыте (необязательно)"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className="pl-12 pt-4 min-h-[120px] bg-slate-700 border-red-900/50 text-gray-200 placeholder:text-gray-500 focus:border-red-600 focus:ring-red-600/20 transition-all resize-none"
                        />
                      </div>

                      {/* Submit button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg relative overflow-hidden group transition-all duration-300"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        <div className="relative flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>Отправляем...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              <span>Получить консультацию</span>
                            </>
                          )}
                        </div>
                      </Button>
                    </form>
                  ) : (
                    // Success state
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600/20 border-2 border-green-500 rounded-full mb-6">
                        <CheckCircle className="w-10 h-10 text-green-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-100 mb-4">
                        Заявка успешно отправлена!
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        Спасибо за ваш интерес к нашим курсам. Мы свяжемся с вами в течение 24 часов для персональной консультации.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits */}
          <div 
            className={`transition-all duration-700 ease-out ${
              visibleElements.includes(2) 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-100 mb-8">
                Что вы получите:
              </h3>
              
              {[
                {
                  icon: Star,
                  title: "Персональный план обучения",
                  description: "Индивидуальная программа, учитывающая ваш уровень и цели"
                },
                {
                  icon: Code,
                  title: "Актуальные технологии",
                  description: "Изучаете только те инструменты, которые востребованы на рынке"
                },
                {
                  icon: User,
                  title: "Личный наставник",
                  description: "Опытный ментор поможет на каждом этапе обучения"
                },
                {
                  icon: CheckCircle,
                  title: "Гарантия трудоустройства",
                  description: "Помогаем найти работу или вернем деньги"
                }
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-red-900/30 hover:border-red-600/50 transition-all duration-300 group"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-600 rounded-lg blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="relative w-12 h-12 bg-red-900/30 border border-red-600/50 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-red-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-200 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;