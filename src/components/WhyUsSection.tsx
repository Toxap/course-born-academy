import { Users, Code2, UserCheck, Briefcase } from "lucide-react";

const WhyUsSection = () => {
  const advantages = [
    {
      icon: Users,
      title: "Наставники из IT-индустрии",
      description: "Опытные разработчики с практикой в крупных компаниях",
      color: "from-blue-500 to-purple-600",
      shape: "hexagon"
    },
    {
      icon: Code2,
      title: "Работающие программы и проекты",
      description: "Реальные проекты для портфолио, а не учебные задачки",
      color: "from-green-500 to-teal-600",
      shape: "triangle"
    },
    {
      icon: UserCheck,
      title: "Индивидуальный подход",
      description: "Персональные консультации и адаптация программы под вас",
      color: "from-orange-500 to-red-600",
      shape: "circle"
    },
    {
      icon: Briefcase,
      title: "Помощь с трудоустройством",
      description: "Содействие в поиске работы и подготовка к собеседованиям",
      color: "from-purple-500 to-pink-600",
      shape: "diamond"
    }
  ];

  const GeometricShape = ({ type, className = "" }) => {
    const shapes = {
      hexagon: (
        <div className={`w-20 h-20 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,5 90,25 90,75 50,95 10,75 10,25"
              fill="currentColor"
              className="opacity-20"
            />
          </svg>
        </div>
      ),
      triangle: (
        <div className={`w-16 h-16 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,10 90,90 10,90"
              fill="currentColor"
              className="opacity-20"
            />
          </svg>
        </div>
      ),
      circle: (
        <div className={`w-18 h-18 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="currentColor"
              className="opacity-20"
            />
          </svg>
        </div>
      ),
      diamond: (
        <div className={`w-16 h-16 ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,10 90,50 50,90 10,50"
              fill="currentColor"
              className="opacity-20"
            />
          </svg>
        </div>
      )
    };
    
    return shapes[type] || shapes.circle;
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Floating geometric decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-primary/10 animate-pulse">
          <GeometricShape type="hexagon" className="transform rotate-45" />
        </div>
        <div className="absolute top-40 right-20 text-accent/10 animate-bounce">
          <GeometricShape type="triangle" className="transform -rotate-12" />
        </div>
        <div className="absolute bottom-20 left-20 text-secondary/10 animate-pulse">
          <GeometricShape type="diamond" className="transform rotate-90" />
        </div>
        <div className="absolute bottom-40 right-10 text-primary/10 animate-bounce">
          <GeometricShape type="circle" className="transform scale-150" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 relative z-10">
              Почему выбирают нас
            </h2>
            <div className="absolute -top-4 -right-4 text-accent/20">
              <GeometricShape type="hexagon" className="transform rotate-12" />
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Мы предлагаем качественное образование с фокусом на практических навыках
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            return (
              <div
                key={index}
                className="relative group"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fade-in 0.6s ease-out forwards'
                }}
              >
                {/* Background geometric shape */}
                <div className="absolute inset-0 -z-10 transform group-hover:scale-110 transition-transform duration-500">
                  <div className={`absolute top-0 right-0 text-gradient-to-br ${advantage.color} opacity-5 transform rotate-45`}>
                    <GeometricShape type={advantage.shape} className="w-32 h-32" />
                  </div>
                </div>
                
                {/* Main card */}
                <div className="relative p-8 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group-hover:bg-card/90">
                  {/* Icon container with geometric background */}
                  <div className="relative mb-6 mx-auto w-20 h-20 flex items-center justify-center">
                    <div className={`absolute inset-0 bg-gradient-to-br ${advantage.color} rounded-2xl transform rotate-45 group-hover:rotate-90 transition-transform duration-500`}></div>
                    <div className="relative z-10">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-primary mb-3 text-center">
                    {advantage.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-center">
                    {advantage.description}
                  </p>
                  
                  {/* Decorative line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${advantage.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl`}></div>
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