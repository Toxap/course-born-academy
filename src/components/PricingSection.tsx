import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Award } from "lucide-react";
import { useState, useEffect } from "react";

const PricingSection = () => {
  const [cardsVisible, setCardsVisible] = useState([false, false, false]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const plans = [
    {
      name: "Базовый",
      price: "2,999",
      period: "месяц",
      description: "Идеально для начинающих",
      isPopular: false,
      features: [
        "Доступ к базовым курсам",
        "2 часа занятий в неделю", 
        "Чат поддержка",
        "Сертификат об окончании",
        "Мобильное приложение"
      ]
    },
    {
      name: "Стандарт",
      price: "4,999", 
      period: "месяц",
      description: "Самый популярный выбор",
      isPopular: true,
      features: [
        "Доступ ко всем курсам",
        "4 часа занятий в неделю",
        "Персональный куратор",
        "Практические проекты",
        "Сертификат об окончании",
        "Мобильное приложение",
        "Группа в Telegram"
      ]
    },
    {
      name: "Премиум",
      price: "7,999",
      period: "месяц", 
      description: "Максимальный результат",
      isPopular: false,
      features: [
        "Доступ ко всем курсам",
        "Неограниченные занятия",
        "Персональный ментор",
        "1-на-1 консультации",
        "Реальные проекты",
        "Помощь в трудоустройстве",
        "Сертификат об окончании",
        "Мобильное приложение",
        "VIP группа в Telegram"
      ]
    }
  ];

  useEffect(() => {
    const cardTimers = plans.map((_, index) => 
      setTimeout(() => {
        setCardsVisible(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, 200 + index * 150)
    );

    return () => {
      cardTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-red-400/20 animate-pulse">
          <Star className="w-8 h-8 transform rotate-12" />
        </div>
        <div className="absolute top-40 right-20 text-red-400/20 animate-bounce">
          <Zap className="w-6 h-6 transform -rotate-12" />
        </div>
        <div className="absolute bottom-20 right-10 text-red-400/20 animate-pulse">
          <Award className="w-10 h-10 transform rotate-45" />
        </div>
        <div className="absolute bottom-40 left-20 text-red-400/20 animate-bounce">
          <Star className="w-6 h-6 transform -rotate-45" />
        </div>
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-400 to-transparent animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-400 to-transparent animate-pulse delay-300"></div>
          <div className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-red-400 to-transparent animate-pulse delay-500"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-200 mb-4">
            Выберите свой тариф
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Доступные планы обучения для достижения ваших целей в программировании
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group relative transform transition-all duration-700 ${
                cardsVisible[index] 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-12 opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-3xl bg-red-600/20 blur-xl transition-all duration-500 ${
                hoveredCard === index ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
              }`}></div>
              
              {/* Main card */}
              <Card className={`relative bg-slate-800 rounded-3xl border-2 transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/20 hover:-translate-y-2 overflow-hidden h-full flex flex-col ${
                plan.isPopular 
                  ? 'border-red-600/70 shadow-xl shadow-red-900/20 scale-105' 
                  : 'border-red-900/50 hover:border-red-600/70'
              }`}>
                
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-red-400 rounded-full transition-transform duration-1000 ${
                    hoveredCard === index ? 'scale-150 translate-x-4 -translate-y-4' : 'scale-100'
                  }`}></div>
                  <div className={`absolute bottom-0 left-0 w-24 h-24 bg-red-600 rounded-full transition-transform duration-1000 delay-200 ${
                    hoveredCard === index ? 'scale-125 -translate-x-2 translate-y-2' : 'scale-100'
                  }`}></div>
                </div>

                {plan.isPopular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-20">
                    Популярный
                  </div>
                )}
                
                <CardHeader className={`text-center pb-4 relative z-10 ${plan.isPopular ? 'pt-8' : ''}`}>
                  <CardTitle className="text-2xl font-bold text-gray-200">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-200">
                      {plan.price}₽
                    </span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 relative z-10 flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-200">
                        <Check className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full mt-6 font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      plan.isPopular 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-slate-700 hover:bg-red-900 text-gray-200 border-2 border-red-900/50 hover:border-red-600/70'
                    }`}
                    size="lg"
                  >
                    Выбрать план
                  </Button>
                </CardContent>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-red-600 transform transition-all duration-500 ${
                  hoveredCard === index ? 'scale-x-100' : 'scale-x-0'
                } origin-center rounded-b-3xl`}></div>
                
                {/* Scan line effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-red-400/10 to-transparent transform transition-transform duration-1000 ${
                  hoveredCard === index ? 'translate-x-full' : '-translate-x-full'
                } rounded-3xl`}></div>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">
            Все планы включают 14-дневную гарантию возврата средств
          </p>
          <Button 
            variant="ghost" 
            className="text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-300"
          >
            Сравнить все планы →
          </Button>
        </div>
        
        {/* Bottom decorative element */}
        <div className="text-center mt-8">
          <div className="flex justify-center items-center space-x-6">
            <div className="flex items-center space-x-2 text-red-400/60">
              <Star className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-medium">Проверено студентами</span>
              <Star className="w-4 h-4 animate-pulse delay-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;