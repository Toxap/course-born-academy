import { Search, UserCheck, Trophy } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Выбираете курс",
      description: "Изучаете программу обучения и выбираете подходящий курс из нашего каталога"
    },
    {
      icon: UserCheck,
      number: "02", 
      title: "Занимаетесь с наставником",
      description: "Проходите теорию, выполняете практические задания под руководством опытного ментора"
    },
    {
      icon: Trophy,
      number: "03",
      title: "Получаете навыки и портфолио",
      description: "Завершаете обучение с готовыми проектами и навыками для трудоустройства"
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Как это работает
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Простой и понятный процесс обучения от выбора курса до трудоустройства
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-20 left-1/6 right-1/6 h-0.5 bg-gradient-accent"></div>
            
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center relative">
                  {/* Step number */}
                  <div className="bg-gradient-accent text-white rounded-full w-12 h-12 mx-auto mb-6 flex items-center justify-center text-lg font-bold">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="bg-card p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-soft">
                    <IconComponent className="h-8 w-8 text-accent" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;