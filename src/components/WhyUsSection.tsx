import { Users, Code2, UserCheck, Briefcase } from "lucide-react";

const WhyUsSection = () => {
  const advantages = [
    {
      icon: Users,
      title: "Наставники из IT-индустрии",
      description: "Опытные разработчики с практикой в крупных компаниях"
    },
    {
      icon: Code2,
      title: "Работающие программы и проекты",
      description: "Реальные проекты для портфолио, а не учебные задачки"
    },
    {
      icon: UserCheck,
      title: "Индивидуальный подход",
      description: "Персональные консультации и адаптация программы под вас"
    },
    {
      icon: Briefcase,
      title: "Помощь с трудоустройством",
      description: "Содействие в поиске работы и подготовка к собеседованиям"
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Почему выбирают нас
          </h2>
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
                className="text-center p-6 bg-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2"
              >
                <div className="bg-gradient-accent p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;