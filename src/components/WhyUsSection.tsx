import { useState, useEffect } from "react";
import { Users, Code2, UserCheck, Briefcase, Shield, Sword, Crown, Star, Zap, Gem, Castle, Wand2 } from "lucide-react";

const WhyUsSection = () => {
  const [cardsVisible, setCardsVisible] = useState([false, false, false, false]);
  const [runesActive, setRunesActive] = useState(false);

  const advantages = [
    {
      icon: Users,
      runeIcon: Shield,
      title: "Гильдия Мастеров",
      subtitle: "Наставники из IT-индустрии", 
      description: "Опытные волшебники кода с практикой в великих цифровых империях",
      color: "from-blue-500 to-purple-600",
      glowColor: "shadow-blue-500/30",
      runeColor: "text-blue-400"
    },
    {
      icon: Code2,
      runeIcon: Sword,
      title: "Боевые Артефакты",
      subtitle: "Работающие программы и проекты",
      description: "Реальные магические орудия для портфолио, созданные в пылу настоящих сражений",
      color: "from-green-500 to-teal-600", 
      glowColor: "shadow-green-500/30",
      runeColor: "text-green-400"
    },
    {
      icon: UserCheck,
      runeIcon: Crown,
      title: "Личный Наставник",
      subtitle: "Индивидуальный подход",
      description: "Персональные заклинания и адаптация древних знаний под ваш путь воина",
      color: "from-orange-500 to-red-600",
      glowColor: "shadow-orange-500/30", 
      runeColor: "text-orange-400"
    },
    {
      icon: Briefcase,
      runeIcon: Castle,
      title: "Врата в Империю",
      subtitle: "Помощь с трудоустройством",
      description: "Открываем порталы в великие IT-королевства и готовим к испытаниям стражей",
      color: "from-purple-500 to-pink-600",
      glowColor: "shadow-purple-500/30",
      rune: "text-purple-400"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setRunesActive(true);
    }, 300);

    const cardTimers = advantages.map((_, index) => 
      setTimeout(() => {
        setCardsVisible(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, 800 + index * 200)
    );

    return () => {
      clearTimeout(timer);
      cardTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 overflow-hidden">
      {/* Medieval mystical background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating magical runes */}
        <div className={`absolute top-20 left-10 text-amber-400/20 transform transition-all duration-1000 ${runesActive ? 'rotate-0 scale-100' : 'rotate-45 scale-0'}`}>
          <Shield className="w-20 h-20 animate-pulse" />
        </div>
        <div className={`absolute top-40 right-20 text-cyan-300/20 transform transition-all duration-1000 delay-200 ${runesActive ? 'rotate-0 scale-100' : '-rotate-12 scale-0'}`}>
          <Sword className="w-16 h-16 animate-bounce" />
        </div>
        <div className={`absolute bottom-20 left-20 text-purple-400/20 transform transition-all duration-1000 delay-400 ${runesActive ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`}>
          <Crown className="w-24 h-24 animate-pulse" />
        </div>
        <div className={`absolute bottom-40 right-10 text-pink-300/20 transform transition-all duration-1000 delay-600 ${runesActive ? 'rotate-0 scale-100' : '-rotate-45 scale-0'}`}>
          <Castle className="w-18 h-18 animate-bounce" />
        </div>

        {/* Mystical energy lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-400 to-transparent animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse"></div>
          <div className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
          <div className="absolute left-0 bottom-1/3 w-full h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse"></div>
        </div>

        {/* Floating magical particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-pulse"
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
        {/* Magical header */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-cyan-300 mb-4 relative z-10">
              Почему выбирают нас
            </h2>
            {/* Magical crown decoration */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <Crown className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>
            {/* Floating stars */}
            <div className="absolute -top-2 -left-8">
              <Star className="w-4 h-4 text-purple-400 animate-spin" />
            </div>
            <div className="absolute -top-2 -right-8">
              <Star className="w-4 h-4 text-cyan-400 animate-spin" />
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Наша магическая академия предлагает уникальное обучение искусству кодинга с фокусом на боевые практики
          </p>
        </div>

        {/* Magical guild cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            const RuneComponent = advantage.runeIcon;
            
            return (
              <div
                key={index}
                className={`relative group transform transition-all duration-1000 ${
                  cardsVisible[index] 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-8 opacity-0 scale-95'
                }`}
              >
                {/* Magical aura background */}
                <div className="absolute inset-0 -z-10 transform group-hover:scale-110 transition-transform duration-500">
                  <div className={`absolute -inset-4 bg-gradient-to-br ${advantage.color} opacity-5 rounded-3xl blur-xl`}></div>
                </div>
                
                {/* Main magical card */}
                <div className={`relative p-8 bg-gradient-to-br from-slate-800/90 to-purple-900/90 backdrop-blur-sm rounded-3xl border-2 border-amber-400/30 hover:border-amber-400/60 transition-all duration-500 hover:shadow-2xl ${advantage.glowColor} hover:-translate-y-4 group-hover:bg-slate-800/95`}>
                  
                  {/* Magical rune corners */}
                  <div className="absolute top-2 left-2">
                    <div className="w-3 h-3 border-l-2 border-t-2 border-amber-400/40"></div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <div className="w-3 h-3 border-r-2 border-t-2 border-purple-400/40"></div>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <div className="w-3 h-3 border-l-2 border-b-2 border-cyan-400/40"></div>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <div className="w-3 h-3 border-r-2 border-b-2 border-pink-400/40"></div>
                  </div>

                  {/* Floating rune icon */}
                  <div className="absolute -top-4 -right-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full border-2 border-amber-400/30 flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                      <RuneComponent className={`w-4 h-4 ${advantage.runeColor}`} />
                    </div>
                  </div>
                  
                  {/* Icon container with magical crystal */}
                  <div className="relative mb-6 mx-auto w-20 h-20 flex items-center justify-center">
                    <div className={`absolute inset-0 bg-gradient-to-br ${advantage.color} rounded-2xl transform rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-lg`}></div>
                    {/* Inner magical glow */}
                    <div className={`absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-xl transform rotate-45 group-hover:rotate-90 transition-transform duration-500`}></div>
                    <div className="relative z-10">
                      <IconComponent className="h-8 w-8 text-white drop-shadow-lg" />
                    </div>
                    {/* Magical particles around icon */}
                    <div className="absolute -inset-2">
                      <div className="absolute top-0 left-1/2 w-1 h-1 bg-amber-400 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-0 right-1/2 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                      <div className="absolute left-0 top-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
                      <div className="absolute right-0 bottom-1/2 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-700"></div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center space-y-3">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-purple-300">
                      {advantage.title}
                    </h3>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                      {advantage.subtitle}
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {advantage.description}
                    </p>
                  </div>
                  
                  {/* Magical energy line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${advantage.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl`}></div>
                  
                  {/* Holographic scan line */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Magical footer decoration */}
        <div className="text-center mt-16">
          <div className="flex justify-center items-center space-x-4 text-amber-400/60">
            <Wand2 className="w-6 h-6 animate-pulse" />
            <Gem className="w-5 h-5 animate-bounce" />
            <Star className="w-4 h-4 animate-spin" />
            <Gem className="w-5 h-5 animate-bounce delay-300" />
            <Wand2 className="w-6 h-6 animate-pulse delay-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;