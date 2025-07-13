import { useState, useEffect, useRef } from "react";
import { Code, Zap, Trophy, Users, Brain, Rocket, Play, ChevronRight } from "lucide-react";

const LearningProcessSection = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const phases = [
    {
      id: "foundation",
      title: "Основы",
      icon: Code,
      description: "Изучаем синтаксис языка и базовые концепции программирования",
      duration: "2-3 недели",
      skills: ["HTML/CSS", "JavaScript", "Git"]
    },
    {
      id: "practice", 
      title: "Практика",
      icon: Zap,
      description: "Работаем с реальными задачами и создаем первые проекты",
      duration: "4-6 недель",
      skills: ["React", "API", "Проекты"]
    },
    {
      id: "mastery",
      title: "Мастерство",
      icon: Trophy,
      description: "Создаем полноценные приложения и изучаем лучшие практики",
      duration: "6-8 недель", 
      skills: ["TypeScript", "Testing", "Деплой"]
    },
    {
      id: "teamwork",
      title: "Командная работа",
      icon: Users,
      description: "Участвуем в групповых проектах и изучаем методологии разработки",
      duration: "2-3 недели",
      skills: ["Agile", "Code Review", "Teamwork"]
    },
    {
      id: "expertise",
      title: "Экспертиза",
      icon: Brain,
      description: "Углубляемся в архитектурные паттерны и оптимизацию",
      duration: "3-4 недели",
      skills: ["Архитектура", "Performance", "Patterns"]
    },
    {
      id: "career",
      title: "Карьера",
      icon: Rocket,
      description: "Подготовка портфолио, собеседования и поиск работы",
      duration: "2-3 недели",
      skills: ["Портфолио", "CV", "Собеседования"]
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
    <section ref={sectionRef} className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 left-10 text-red-400/20 animate-pulse">
          <Code className="w-12 h-12 transform rotate-12" />
        </div>
        <div className="absolute bottom-20 right-20 text-red-400/20 animate-pulse delay-300">
          <Rocket className="w-16 h-16 transform -rotate-12" />
        </div>
        <div className="absolute top-1/2 right-10 text-red-400/20 animate-bounce">
          <Trophy className="w-10 h-10" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-200 mb-4">
            Процесс обучения
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Пройдите путь от новичка до профессионала за 6 этапов
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Animated progress line with moving arrow */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-700 hidden lg:block transform -translate-x-1/2 rounded-full">
            <div 
              className="w-full bg-gradient-to-b from-red-600 via-red-500 to-red-400 transition-all duration-500 rounded-full shadow-lg shadow-red-600/50 relative"
              style={{ height: `${(scrollProgress * 100)}%` }}
            >
              {/* Moving arrow that follows the progress */}
              <div 
                className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-300"
                style={{ top: `${Math.max(0, (scrollProgress * 100) - 2)}%` }}
              >
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[12px] border-transparent border-t-red-500 animate-pulse drop-shadow-lg"></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {phases.map((phase, index) => {
              const IconComponent = phase.icon;
              const isActive = index <= activePhase;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={phase.id}
                  className={`relative transition-all duration-700 min-h-96 ${
                    isActive 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-30 translate-y-8 scale-95'
                  } ${isEven ? 'lg:pr-8' : 'lg:pl-8 lg:justify-self-end'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredPhase(index)}
                  onMouseLeave={() => setHoveredPhase(null)}
                >
                  {/* Extended connection line to center */}
                  <div className={`hidden lg:block absolute top-8 w-12 h-0.5 bg-red-600 transition-all duration-300 ${
                    isEven ? 'right-0' : 'left-0'
                  } ${isActive ? 'opacity-100 shadow-red-600/50 shadow-lg' : 'opacity-30'}`} />
                  
                  {/* Additional connecting segment */}
                  <div className={`hidden lg:block absolute top-8 w-2 h-0.5 transition-all duration-300 ${
                    isEven ? 'right-12 bg-red-500' : 'left-12 bg-red-500'
                  } ${isActive ? 'opacity-100' : 'opacity-30'}`} />
                  
                  {/* Phase card with advanced animations */}
                  <div className={`group relative bg-slate-800 rounded-3xl border-2 border-red-900/50 p-8 transition-all duration-500 hover:border-red-600/70 hover:shadow-2xl hover:shadow-red-900/20 overflow-hidden min-h-96 flex flex-col ${
                    hoveredPhase === index ? 'transform hover:-translate-y-4' : ''
                  }`}>
                    
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className={`absolute -top-10 -right-10 w-32 h-32 bg-red-400 rounded-full transition-all duration-1000 ${
                        hoveredPhase === index ? 'scale-150 rotate-45' : 'scale-100 rotate-0'
                      }`}></div>
                      <div className={`absolute -bottom-10 -left-10 w-24 h-24 bg-red-600 rounded-full transition-all duration-1000 delay-200 ${
                        hoveredPhase === index ? 'scale-125 -rotate-45' : 'scale-100 rotate-0'
                      }`}></div>
                    </div>

                    
                    {/* Scan line effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-red-400/10 to-transparent transform transition-transform duration-1000 ${
                      hoveredPhase === index ? 'translate-x-full' : '-translate-x-full'
                    } rounded-3xl`}></div>
                    
                    {/* Icon with morphing animation */}
                    <div className="relative mb-6 mx-auto w-20 h-20 flex items-center justify-center flex-shrink-0">
                      <div className={`absolute inset-0 bg-red-900 rounded-2xl transition-all duration-500 ${
                        hoveredPhase === index ? 'rotate-12 scale-110' : 'rotate-0 scale-100'
                      }`}></div>
                      <div className={`absolute inset-2 bg-red-600/20 rounded-xl transition-all duration-500 delay-100 ${
                        hoveredPhase === index ? '-rotate-6 scale-105' : 'rotate-0 scale-100'
                      }`}></div>
                      <div className={`relative z-10 transition-all duration-300 ${
                        hoveredPhase === index ? 'scale-110' : 'scale-100'
                      }`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      
                      {/* Orbiting elements */}
                      <div className={`absolute inset-0 transition-all duration-500 ${
                        isActive ? 'animate-spin' : ''
                      }`} style={{ animationDuration: '8s' }}>
                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-red-400 rounded-full transform -translate-x-1/2"></div>
                        <div className="absolute bottom-0 right-1/2 w-2 h-2 bg-red-400 rounded-full transform translate-x-1/2"></div>
                      </div>
                    </div>
                    
                    {/* Content with staggered animations */}
                    <div className="space-y-4 relative z-10 flex-grow flex flex-col">
                      <div className="flex items-center justify-between flex-shrink-0">
                        <h3 className="text-2xl font-bold text-gray-200 group-hover:text-white transition-colors duration-300">
                          {phase.title}
                        </h3>
                        <div className={`flex items-center space-x-2 transition-all duration-300 ${
                          hoveredPhase === index ? 'translate-x-2' : 'translate-x-0'
                        }`}>
                          <Play className="w-4 h-4 text-red-400" />
                          <ChevronRight className="w-4 h-4 text-red-400" />
                        </div>
                      </div>
                      
                      <span className="inline-block text-xs font-semibold text-red-400 bg-red-900/20 px-3 py-1 rounded-full flex-shrink-0 w-fit">
                        {phase.duration}
                      </span>
                      
                      <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 flex-grow">
                        {phase.description}
                      </p>
                      
                      {/* Skills tags with animation */}
                      <div className="flex flex-wrap gap-2 mt-auto flex-shrink-0">
                        {phase.skills.map((skill, skillIndex) => (
                          <span
                            key={skill}
                            className={`px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-xs transition-all duration-300 hover:bg-red-900/50 hover:text-red-300 ${
                              hoveredPhase === index ? 'scale-105' : 'scale-100'
                            }`}
                            style={{ transitionDelay: `${skillIndex * 50}ms` }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Bottom progress indicator */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-red-600 transform transition-all duration-500 ${
                      hoveredPhase === index ? 'scale-x-100' : 'scale-x-0'
                    } origin-center rounded-b-3xl`}></div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default LearningProcessSection;