import { useState, useEffect } from "react";
import { Users, Code2, UserCheck, Briefcase, Star, Zap, Award } from "lucide-react";

const WhyUsSection = () => {
  const [cardsVisible, setCardsVisible] = useState([false, false, false, false]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const advantages = [
    {
      icon: Users,
      title: "Опытные наставники", 
      description: "Менторы из IT-индустрии с практическим опытом работы в крупных компаниях",
      stats: "50+ менторов",
      color: "red"
    },
    {
      icon: Code2,
      title: "Реальные проекты",
      description: "Работающие программы и приложения для портфолио с использованием современных технологий",
      stats: "200+ проектов",
      color: "red"
    },
    {
      icon: UserCheck,
      title: "Индивидуальный подход",
      description: "Персональный план обучения под ваши цели и график работы",
      stats: "1:1 менторинг",
      color: "red"
    },
    {
      icon: Briefcase,
      title: "Помощь с трудоустройством", 
      description: "Поддержка в поиске работы, подготовка к собеседованиям и составление резюме",
      stats: "85% трудоустройство",
      color: "red"
    }
  ];

  useEffect(() => {
    const cardTimers = advantages.map((_, index) => 
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
            Почему выбирают нас
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Качественное образование с индивидуальным подходом и практической направленностью
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            
            return (
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
                <div className="relative bg-slate-800 rounded-3xl border-2 border-red-900/50 p-8 hover:border-red-600/70 transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/20 hover:-translate-y-2 overflow-hidden h-full flex flex-col">
                  
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-red-400 rounded-full transition-transform duration-1000 ${
                      hoveredCard === index ? 'scale-150 translate-x-4 -translate-y-4' : 'scale-100'
                    }`}></div>
                    <div className={`absolute bottom-0 left-0 w-24 h-24 bg-red-600 rounded-full transition-transform duration-1000 delay-200 ${
                      hoveredCard === index ? 'scale-125 -translate-x-2 translate-y-2' : 'scale-100'
                    }`}></div>
                  </div>
                  
                  {/* Floating number indicator */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-red-600 border-2 border-white rounded-full flex items-center justify-center text-white text-base font-bold shadow-xl z-20">
                    {index + 1}
                  </div>
                  
                  {/* Icon container with advanced animations */}
                  <div className="relative mb-6 mx-auto w-20 h-20 flex items-center justify-center">
                    <div className={`absolute inset-0 bg-red-900 rounded-2xl transform transition-all duration-500 ${
                      hoveredCard === index ? 'rotate-12 scale-110' : 'rotate-0 scale-100'
                    }`}></div>
                    <div className={`absolute inset-2 bg-red-600/20 rounded-xl transform transition-all duration-500 delay-100 ${
                      hoveredCard === index ? '-rotate-6 scale-105' : 'rotate-0 scale-100'
                    }`}></div>
                    <div className="relative z-10">
                      <IconComponent className={`h-8 w-8 text-white transition-all duration-300 ${
                        hoveredCard === index ? 'scale-110' : 'scale-100'
                      }`} />
                    </div>
                    
                    {/* Orbiting particles */}
                    <div className={`absolute inset-0 transition-all duration-500 ${
                      hoveredCard === index ? 'animate-spin' : ''
                    }`}>
                      <div className="absolute top-0 left-1/2 w-1 h-1 bg-red-400 rounded-full transform -translate-x-1/2"></div>
                      <div className="absolute bottom-0 right-1/2 w-1 h-1 bg-red-400 rounded-full transform translate-x-1/2"></div>
                      <div className="absolute left-0 top-1/2 w-1 h-1 bg-red-400 rounded-full transform -translate-y-1/2"></div>
                      <div className="absolute right-0 bottom-1/2 w-1 h-1 bg-red-400 rounded-full transform translate-y-1/2"></div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4 relative z-10">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-200 mb-2">
                        {advantage.title}
                      </h3>
                      <div className={`text-xs font-semibold text-red-400 bg-red-900/20 px-3 py-1 rounded-full inline-block mb-3 transition-all duration-300 ${
                        hoveredCard === index ? 'scale-110' : 'scale-100'
                      }`}>
                        {advantage.stats}
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm text-center">
                      {advantage.description}
                    </p>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-red-600 transform transition-all duration-500 ${
                    hoveredCard === index ? 'scale-x-100' : 'scale-x-0'
                  } origin-center rounded-b-3xl`}></div>
                  
                  {/* Scan line effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-red-400/10 to-transparent transform transition-transform duration-1000 ${
                    hoveredCard === index ? 'translate-x-full' : '-translate-x-full'
                  } rounded-3xl`}></div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Bottom decorative element */}
        <div className="text-center mt-16">
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

export default WhyUsSection;