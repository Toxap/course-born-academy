import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect, useRef } from "react";
import { HelpCircle, Plus, Minus, Zap, MessageCircle, Clock, Award, Users } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Подходят ли курсы для новичков?",
    answer: "Да, большинство наших курсов разработаны специально для людей без опыта программирования. Мы начинаем с самых основ и постепенно переходим к более сложным темам.",
    icon: Users
  },
  {
    question: "Сколько времени нужно уделять обучению?",
    answer: "Рекомендуется заниматься 10-15 часов в неделю. Это позволит комфортно усваивать материал и выполнять практические задания.",
    icon: Clock
  },
  {
    question: "Есть ли поддержка после окончания курса?",
    answer: "Да, мы предоставляем поддержку в течение 6 месяцев после завершения курса, включая помощь с трудоустройством и консультации по проектам.",
    icon: MessageCircle
  },
  {
    question: "Какие технические требования для обучения?",
    answer: "Вам понадобится компьютер с доступом в интернет. Все необходимое программное обеспечение бесплатное, мы поможем с установкой и настройкой.",
    icon: Zap
  },
  {
    question: "Можно ли получить сертификат по окончанию?",
    answer: "Да, после успешного завершения курса и защиты финального проекта вы получите сертификат, который можно указать в резюме.",
    icon: Award
  }
] as const;

const FAQSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [expandedItem, setExpandedItem] = useState<string | undefined>(undefined);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            FAQ_ITEMS.forEach((_, index) => {
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

  return (
    <section ref={sectionRef} className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-20 left-20 text-red-400/20 animate-pulse">
          <HelpCircle className="w-16 h-16 transform rotate-12" />
        </div>
        <div className="absolute bottom-20 right-20 text-red-400/20 animate-pulse delay-500">
          <MessageCircle className="w-12 h-12 transform -rotate-12" />
        </div>
        
        {/* Floating pattern elements */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-red-600/5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-red-400/5 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-200 mb-4">
            Часто задаваемые вопросы
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ответы на самые популярные вопросы о наших курсах и процессе обучения
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion 
            type="single" 
            collapsible 
            className="space-y-6"
            value={expandedItem}
            onValueChange={setExpandedItem}
          >
            {FAQ_ITEMS.map((faq, index) => {
              const isVisible = visibleCards.includes(index);
              const isExpanded = expandedItem === `item-${index}`;
              const Icon = faq.icon;
              
              return (
                <div
                  key={index}
                  className={`group transition-all duration-700 ease-out ${
                    isVisible 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <AccordionItem 
                    value={`item-${index}`}
                    className="bg-slate-800 border-2 border-red-900/50 hover:border-red-600/70 rounded-2xl p-6 transition-all duration-500 hover:shadow-lg hover:shadow-red-900/20 overflow-hidden relative"
                  >
                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 bg-red-600/5 transition-opacity duration-300 ${
                      isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}></div>
                    
                    {/* Scan line effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-red-400/10 to-transparent transform transition-transform duration-1000 ${
                      isExpanded ? 'translate-x-full' : '-translate-x-full group-hover:translate-x-full'
                    }`}></div>
                    
                    <AccordionTrigger className="text-left hover:no-underline relative z-10 group">
                      <div className="flex items-center gap-4 w-full">
                        {/* Icon with glow effect */}
                        <div className="relative">
                          <div className={`absolute inset-0 bg-red-600 rounded-full blur-md transition-opacity duration-300 ${
                            isExpanded ? 'opacity-30' : 'opacity-0 group-hover:opacity-20'
                          }`}></div>
                          <div className={`relative w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                            isExpanded 
                              ? 'bg-red-900/30 border-red-600/70 text-red-400' 
                              : 'bg-slate-700 border-red-900/50 text-red-400/70 group-hover:border-red-600/50 group-hover:text-red-400'
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>
                        
                        {/* Question text */}
                        <span className={`text-lg md:text-xl font-semibold transition-colors duration-300 flex-1 ${
                          isExpanded ? 'text-gray-100' : 'text-gray-200 group-hover:text-gray-100'
                        }`}>
                          {faq.question}
                        </span>
                        
                        {/* Custom expand/collapse icon */}
                        <div className={`w-8 h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                          isExpanded 
                            ? 'bg-red-600/20 border-red-600 text-red-400 rotate-180' 
                            : 'bg-slate-700 border-red-900/50 text-red-400/70 group-hover:border-red-600/50 group-hover:text-red-400'
                        }`}>
                          {isExpanded ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    
                    <AccordionContent className="relative z-10 pt-4">
                      <div className="ml-16 pr-12">
                        <p className="text-gray-300 leading-relaxed text-lg">
                          {faq.answer}
                        </p>
                        
                        {/* Bottom accent line */}
                        <div className="mt-6 h-px bg-gradient-to-r from-red-600/50 via-red-400/30 to-transparent"></div>
                      </div>
                    </AccordionContent>
                    
                    {/* Side accent line */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-red-600 transform transition-all duration-300 ${
                      isExpanded ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-50'
                    } origin-top`}></div>
                  </AccordionItem>
                </div>
              );
            })}
          </Accordion>
          
          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-4 bg-slate-800 rounded-full px-8 py-4 border border-red-900/50">
              <MessageCircle className="w-6 h-6 text-red-400" />
              <span className="text-gray-300">Не нашли ответ на свой вопрос?</span>
              <button className="text-red-400 font-semibold hover:text-red-300 transition-colors">
                Задайте его нам
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;