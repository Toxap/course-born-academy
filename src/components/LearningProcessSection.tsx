import { useState, useEffect, useRef } from "react";
import { Code, Zap, Trophy, Users, Brain, Rocket } from "lucide-react";

const LearningProcessSection = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const phases = [
    {
      id: "foundation",
      title: "Фундамент",
      subtitle: "Закладываем основы",
      icon: Code,
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50",
      description: "Изучаем основы программирования, синтаксис языка и базовые концепции. Создаем первые проекты.",
      skills: ["Синтаксис языка", "Основы логики", "Первые проекты"],
      duration: "2-3 недели"
    },
    {
      id: "acceleration",
      title: "Ускорение",
      subtitle: "Набираем темп",
      icon: Zap,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      description: "Углубляемся в сложные темы, изучаем фреймворки и инструменты. Работаем с реальными задачами.",
      skills: ["Фреймворки", "Инструменты", "Сложные алгоритмы"],
      duration: "4-6 недель"
    },
    {
      id: "mastery",
      title: "Мастерство",
      subtitle: "Становимся профи",
      icon: Trophy,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      description: "Создаем полноценные приложения, работаем в команде, изучаем лучшие практики индустрии.",
      skills: ["Полные проекты", "Командная работа", "Best practices"],
      duration: "6-8 недель"
    },
    {
      id: "collaboration",
      title: "Коллаборация",
      subtitle: "Работаем в команде",
      icon: Users,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      description: "Участвуем в групповых проектах, изучаем современные методологии разработки и работы в команде.",
      skills: ["Agile/Scrum", "Git workflow", "Code review"],
      duration: "2-3 недели"
    },
    {
      id: "expertise",
      title: "Экспертиза",
      subtitle: "Глубокие знания",
      icon: Brain,
      color: "from-violet-500 to-purple-600",
      bgColor: "bg-violet-50",
      description: "Изучаем архитектурные паттерны, оптимизацию производительности и продвинутые техники.",
      skills: ["Архитектура", "Оптимизация", "Паттерны"],
      duration: "3-4 недели"
    },
    {
      id: "launch",
      title: "Запуск",
      subtitle: "Готовы к работе",
      icon: Rocket,
      color: "from-rose-500 to-pink-600",
      bgColor: "bg-rose-50",
      description: "Финальные проекты, подготовка портфолио, симуляция собеседований и поиск работы.",
      skills: ["Портфолио", "Собеседования", "Трудоустройство"],
      duration: "2-3 недели"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
        setScrollProgress(progress);
        
        const phaseIndex = Math.floor(progress * phases.length);
        setActivePhase(Math.min(phaseIndex, phases.length - 1));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [phases.length]);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.1),transparent_50%)]"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-400/30 text-indigo-200 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Brain className="w-4 h-4" />
            Путешествие в мир разработки
          </div>
          
          <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
            EVOLUTION
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Пройди путь от новичка до профессионала через 6 эволюционных фаз развития
          </p>
        </div>

        {/* Progress bar */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300"
              style={{ width: `${(scrollProgress * 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-400">
            <span>Новичок</span>
            <span>Профессионал</span>
          </div>
        </div>

        {/* Evolution phases */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {phases.map((phase, index) => {
              const IconComponent = phase.icon;
              const isActive = index <= activePhase;
              const isCurrent = index === activePhase;
              
              return (
                <div
                  key={phase.id}
                  className={`relative group transition-all duration-700 ${
                    isActive 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-30 translate-y-8 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Connection line */}
                  {index < phases.length - 1 && (
                    <div className="absolute top-full left-1/2 w-0.5 h-8 bg-gradient-to-b from-white/30 to-transparent transform -translate-x-1/2 hidden lg:block" />
                  )}
                  
                  <div className={`relative p-8 rounded-3xl border transition-all duration-500 ${
                    isCurrent 
                      ? `bg-gradient-to-br ${phase.color} shadow-2xl shadow-indigo-500/25 border-white/20` 
                      : 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10'
                  }`}>
                    {/* Phase indicator */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-200 flex items-center justify-center font-black text-gray-800 shadow-lg">
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                      isCurrent 
                        ? 'bg-white/20 backdrop-blur-sm' 
                        : 'bg-gradient-to-br from-white/10 to-white/5'
                    }`}>
                      <IconComponent className={`w-8 h-8 ${isCurrent ? 'text-white' : 'text-gray-300'}`} />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-4">
                      <div>
                        <h3 className={`text-2xl font-bold mb-2 ${isCurrent ? 'text-white' : 'text-gray-200'}`}>
                          {phase.title}
                        </h3>
                        <p className={`text-sm font-medium ${isCurrent ? 'text-white/80' : 'text-gray-400'}`}>
                          {phase.subtitle}
                        </p>
                      </div>
                      
                      <p className={`leading-relaxed ${isCurrent ? 'text-white/90' : 'text-gray-300'}`}>
                        {phase.description}
                      </p>
                      
                      {/* Skills */}
                      <div className="space-y-2">
                        <h4 className={`text-sm font-semibold ${isCurrent ? 'text-white' : 'text-gray-200'}`}>
                          Ключевые навыки:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {phase.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                isCurrent 
                                  ? 'bg-white/20 text-white' 
                                  : 'bg-white/10 text-gray-300'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Duration */}
                      <div className={`text-sm ${isCurrent ? 'text-white/80' : 'text-gray-400'}`}>
                        📅 Длительность: {phase.duration}
                      </div>
                    </div>
                    
                    {/* Glow effect for active phase */}
                    {isCurrent && (
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-20">
          <div className="inline-flex flex-col items-center gap-6 p-8 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20">
            <h3 className="text-2xl font-bold text-white">Готов начать эволюцию?</h3>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1">
                Начать путешествие
              </button>
              <button className="px-8 py-4 border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300">
                Узнать больше
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningProcessSection;