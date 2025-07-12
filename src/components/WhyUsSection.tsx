import { useState, useEffect } from "react";
import { Users, Code2, UserCheck, Briefcase } from "lucide-react";

const WhyUsSection = () => {
  const [cardsVisible, setCardsVisible] = useState([false, false, false, false]);

  const advantages = [
    {
      icon: Users,
      title: "Опытные наставники",
      description: "Менторы из IT-индустрии с практическим опытом"
    },
    {
      icon: Code2,
      title: "Реальные проекты",
      description: "Работающие программы и приложения для портфолио"
    },
    {
      icon: UserCheck,
      title: "Индивидуальный подход",
      description: "Персональный план обучения под ваши цели"
    },
    {
      icon: Briefcase,
      title: "Помощь с трудоустройством",
      description: "Поддержка в поиске работы и подготовке к собеседованиям"
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
      }, 100 + index * 100)
    );

    return () => {
      cardTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Качественное образование с индивидуальным подходом
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            
            return (
              <div
                key={index}
                className={`group transform transition-all duration-500 ${
                  cardsVisible[index] 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
              >
                <div className="relative p-8 bg-card rounded-3xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">
                      {advantage.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;