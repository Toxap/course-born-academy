import { Button } from "@/components/ui/button";
import { Code, Database, Globe, Server, ChevronLeft, ChevronRight, Users, Target, Clock, Award, BookOpen, Scroll, Gem, Wand2, Shield, Crown, Star, Zap } from "lucide-react";
import { useState, useEffect } from "react";

const CoursesSection = () => {
  const [currentCourse, setCurrentCourse] = useState(0);
  const [bookOpen, setBookOpen] = useState(false);
  const [runesGlowing, setRunesGlowing] = useState(false);

  const courses = [
    {
      id: 1,
      title: "Java-Разработчик", 
      ancientTitle: "Grimoire of Steel Codex",
      runicTitle: "Кодекс Стальной Магии",
      subtitle: "Орден Профессионалов",
      description: "Изучите древние заклинания Java от основ до высшего мастерства. Овладейте искусством создания корпоративных артефактов и работой с хранилищами данных.",
      features: [
        "Основы Java и тайны ООП",
        "Заклинания баз данных",
        "Магия Spring Framework", 
        "Искусство микросервисов",
        "Ритуалы тестирования"
      ],
      duration: "6 лунных циклов",
      level: "Адепт",
      students: "2,500+ учеников",
      employment: "87% призваны",
      color: "from-blue-500 to-blue-700",
      glowColor: "shadow-blue-500/50",
      icon: Code,
      runeIcon: Shield,
      scrollColor: "bg-gradient-to-br from-blue-900/80 to-indigo-900/80",
      sealColor: "border-blue-400",
      magicType: "Стальная Магия"
    },
    {
      id: 2,
      title: "Frontend Буткемп",
      ancientTitle: "Codex of Crystal Visions", 
      runicTitle: "Кодекс Кристальных Видений",
      subtitle: "Интенсивный Ритуал",
      description: "Быстрое постижение магии фронтенда. React заклинания, TypeScript руны, современные артефакты и методы волшебства.",
      features: [
        "HTML5, CSS3, JavaScript руны",
        "React и TypeScript заклинания",
        "Ритуалы работы с API",
        "Адаптивные чары дизайна",
        "Заклинания деплоя проектов"
      ],
      duration: "3 лунных цикла",
      level: "Адепт",
      students: "1,800+ учеников", 
      employment: "82% призваны",
      color: "from-cyan-500 to-cyan-700",
      glowColor: "shadow-cyan-500/50",
      icon: Globe,
      runeIcon: Gem,
      scrollColor: "bg-gradient-to-br from-cyan-900/80 to-teal-900/80",
      sealColor: "border-cyan-400",
      magicType: "Кристальная Магия"
    },
    {
      id: 3,
      title: "Backend Буткемп",
      ancientTitle: "Tome of Shadow Arts",
      runicTitle: "Том Теневых Искусств", 
      subtitle: "Интенсивный Ритуал",
      description: "Серверная магия с Node.js заклинаниями. API ритуалы, хранилища данных, архитектурные заклинания и защитные чары.",
      features: [
        "Node.js и Express заклинания",
        "Хранилища MongoDB/PostgreSQL",
        "REST API и GraphQL ритуалы",
        "Заклинания аутентификации",
        "Микросервисная архитектура"
      ],
      duration: "4 лунных цикла",
      level: "Мастер",
      students: "1,200+ учеников",
      employment: "91% призваны",
      color: "from-green-500 to-green-700", 
      glowColor: "shadow-green-500/50",
      icon: Server,
      runeIcon: Crown,
      scrollColor: "bg-gradient-to-br from-green-900/80 to-emerald-900/80",
      sealColor: "border-green-400",
      magicType: "Теневая Магия"
    },
    {
      id: 4,
      title: "Data Science",
      ancientTitle: "Oracle's Knowledge Vault",
      runicTitle: "Хранилище Знаний Оракула",
      subtitle: "Орден Профессионалов",
      description: "Анализ данных, машинные предсказания, работа с великими хранилищами и создание предсказательных артефактов.",
      features: [
        "Python для магии данных",
        "Pandas, NumPy, Matplotlib заклинания",
        "Машинные предсказания",
        "Работа с Великими Данными",
        "Развертывание ML-артефактов"
      ],
      duration: "5 лунных циклов",
      level: "Мастер", 
      students: "900+ учеников",
      employment: "78% призваны",
      color: "from-purple-500 to-purple-700",
      glowColor: "shadow-purple-500/50",
      icon: Database,
      runeIcon: Star,
      scrollColor: "bg-gradient-to-br from-purple-900/80 to-violet-900/80",
      sealColor: "border-purple-400",
      magicType: "Магия Оракула"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setRunesGlowing(true);
    }, 500);

    const bookTimer = setTimeout(() => {
      setBookOpen(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(bookTimer);
    };
  }, []);

  const nextCourse = () => {
    setCurrentCourse((prev) => (prev + 1) % courses.length);
  };

  const prevCourse = () => {
    setCurrentCourse((prev) => (prev - 1 + courses.length) % courses.length);
  };

  const course = courses[currentCourse];

  return (
    <section id="courses" className="relative py-20 overflow-hidden">
      {/* Medieval mystical background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900"></div>
      
      {/* Floating magical elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.15),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>
        
        {/* Ancient runes floating */}
        <div className={`absolute top-20 left-10 text-amber-400/30 transform transition-all duration-2000 ${runesGlowing ? 'scale-100 rotate-0' : 'scale-0 rotate-45'}`}>
          <BookOpen className="w-20 h-20 animate-pulse" />
        </div>
        <div className={`absolute top-40 right-20 text-purple-300/30 transform transition-all duration-2000 delay-300 ${runesGlowing ? 'scale-100 rotate-0' : 'scale-0 -rotate-12'}`}>
          <Scroll className="w-16 h-16 animate-bounce" />
        </div>
        <div className={`absolute bottom-20 left-20 text-cyan-400/30 transform transition-all duration-2000 delay-500 ${runesGlowing ? 'scale-100 rotate-0' : 'scale-0 rotate-90'}`}>
          <Wand2 className="w-24 h-24 animate-pulse" />
        </div>
        <div className={`absolute bottom-40 right-10 text-pink-300/30 transform transition-all duration-2000 delay-700 ${runesGlowing ? 'scale-100 rotate-0' : 'scale-0 -rotate-45'}`}>
          <Gem className="w-18 h-18 animate-bounce" />
        </div>

        {/* Mystical grid patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-amber-400 to-transparent animate-pulse"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse"></div>
          <div className="absolute left-0 top-1/4 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        </div>

        {/* Floating magical particles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Magical header */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-cyan-300 mb-4">
              Древние Кодексы
            </h2>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <Crown className="w-12 h-12 text-amber-400 animate-pulse" />
            </div>
            {/* Floating mystical symbols */}
            <div className="absolute -top-4 -left-12">
              <Star className="w-6 h-6 text-purple-400 animate-spin" />
            </div>
            <div className="absolute -top-4 -right-12">
              <Star className="w-6 h-6 text-cyan-400 animate-spin" />
            </div>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-300 mb-6">
            Магических Знаний
          </h3>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Выберите путь волшебства и начните своё путешествие к мастерству в магических искусствах IT
          </p>
        </div>

        {/* Magical navigation runes */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {courses.map((courseItem, index) => {
              const RuneIcon = courseItem.runeIcon;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentCourse(index)}
                  className={`relative p-3 rounded-full transition-all duration-500 transform ${
                    index === currentCourse
                      ? `bg-gradient-to-br ${courseItem.color} scale-125 ${courseItem.glowColor} shadow-2xl`
                      : 'bg-slate-800/50 hover:bg-slate-700/50 scale-100'
                  }`}
                >
                  <RuneIcon className={`w-6 h-6 ${index === currentCourse ? 'text-white' : 'text-gray-400'}`} />
                  {index === currentCourse && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Ancient tome/scroll */}
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Navigation spell arrows */}
            <button
              onClick={prevCourse}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-full border-2 border-amber-400/30 flex items-center justify-center text-amber-400 hover:border-amber-400/60 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <ChevronLeft className="w-8 h-8" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={nextCourse}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-full border-2 border-amber-400/30 flex items-center justify-center text-amber-400 hover:border-amber-400/60 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <ChevronRight className="w-8 h-8" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* Ancient tome */}
            <div 
              key={currentCourse}
              className={`relative ${course.scrollColor} backdrop-blur-sm rounded-3xl border-4 ${course.sealColor} shadow-2xl ${course.glowColor} overflow-hidden transition-all duration-1000 ease-in-out transform ${bookOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-90'}`}
            >
              {/* Magical border decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-amber-400/50 rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-purple-400/50 rounded-tr-lg"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50 rounded-bl-lg"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-pink-400/50 rounded-br-lg"></div>

              {/* Mystical glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-purple/5 pointer-events-none"></div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left page - Ancient text */}
                <div className="p-8 lg:p-12 relative">
                  {/* Page decoration */}
                  <div className="absolute top-8 left-8 w-full h-full bg-gradient-to-br from-parchment/5 to-transparent rounded-2xl pointer-events-none"></div>
                  
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center space-x-4">
                      <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${course.color} shadow-xl`}>
                        <course.icon className="w-10 h-10 text-white" />
                        {/* Magical glow around icon */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                      </div>
                      <div>
                        <p className="text-sm text-amber-400 font-bold uppercase tracking-widest">
                          {course.subtitle}
                        </p>
                        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-purple-300">
                          {course.runicTitle}
                        </h3>
                        <p className="text-sm text-gray-400 italic">
                          {course.ancientTitle}
                        </p>
                      </div>
                    </div>

                    {/* Magic type banner */}
                    <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${course.color} bg-opacity-20 border border-amber-400/30`}>
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-300 font-semibold text-sm">{course.magicType}</span>
                    </div>

                    <div className="bg-slate-800/30 rounded-xl p-4 border border-amber-400/20">
                      <p className="text-gray-300 text-lg leading-relaxed italic">
                        "{course.description}"
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-purple-300 flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-amber-400" />
                        <span>Заклинания кодекса:</span>
                      </h4>
                      <ul className="space-y-3">
                        {course.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-purple-400 rounded-full animate-pulse"></div>
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className={`bg-slate-800/50 rounded-xl p-4 border ${course.sealColor}/30`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-5 h-5 text-amber-400" />
                          <span className="text-sm text-gray-400">Обучение</span>
                        </div>
                        <p className="text-white font-bold">{course.duration}</p>
                      </div>
                      <div className={`bg-slate-800/50 rounded-xl p-4 border ${course.sealColor}/30`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <Award className="w-5 h-5 text-purple-400" />
                          <span className="text-sm text-gray-400">Уровень</span>
                        </div>
                        <p className="text-white font-bold">{course.level}</p>
                      </div>
                    </div>

                    <Button className={`w-full bg-gradient-to-r ${course.color} hover:shadow-2xl ${course.glowColor} text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 border border-amber-400/20`}>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Начать Обучение
                    </Button>
                  </div>
                </div>

                {/* Right page - Mystical illustration */}
                <div className="relative p-8 lg:p-12 flex items-center justify-center">
                  <div className="relative">
                    {/* Central magical crystal */}
                    <div className={`relative w-80 h-80 bg-gradient-to-br ${course.color} rounded-full p-8 shadow-2xl ${course.glowColor} border-4 ${course.sealColor}`}>
                      {/* Inner magical circle */}
                      <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-full flex items-center justify-center relative overflow-hidden">
                        {/* Rotating magical rings */}
                        <div className="absolute inset-0 border-2 border-amber-400/20 rounded-full animate-spin"></div>
                        <div className="absolute inset-4 border border-purple-400/20 rounded-full animate-spin reverse"></div>
                        <div className="absolute inset-8 border border-cyan-400/20 rounded-full animate-spin"></div>
                        
                        {/* Central icon */}
                        <div className="relative z-10 p-8 bg-white/10 rounded-full backdrop-blur-sm">
                          <course.icon className="w-24 h-24 text-white" />
                        </div>

                        {/* Magical particles */}
                        <div className="absolute inset-0">
                          {[...Array(12)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-2 h-2 bg-amber-400 rounded-full animate-pulse"
                              style={{
                                left: `${20 + Math.cos(i * 30 * Math.PI / 180) * 30}%`,
                                top: `${20 + Math.sin(i * 30 * Math.PI / 180) * 30}%`,
                                animationDelay: `${i * 0.1}s`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Floating magical stats */}
                    <div className="absolute -top-6 -left-6">
                      <div className={`bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 border-2 ${course.sealColor} shadow-xl`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="w-5 h-5 text-amber-400" />
                          <span className="text-sm text-gray-400">Ученики</span>
                        </div>
                        <p className="text-white font-bold">{course.students}</p>
                      </div>
                    </div>

                    <div className="absolute -bottom-6 -right-6">
                      <div className={`bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 border-2 ${course.sealColor} shadow-xl`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <Target className="w-5 h-5 text-purple-400" />
                          <span className="text-sm text-gray-400">Призваны</span>
                        </div>
                        <p className="text-white font-bold">{course.employment}</p>
                      </div>
                    </div>

                    {/* Floating mystical symbols */}
                    <div className="absolute -top-12 right-8">
                      <Star className="w-8 h-8 text-amber-400/60 animate-spin" />
                    </div>
                    <div className="absolute -bottom-12 left-8">
                      <Gem className="w-6 h-6 text-purple-400/60 animate-bounce" />
                    </div>
                    <div className="absolute top-1/2 -right-12">
                      <Wand2 className="w-10 h-10 text-cyan-400/60 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Holographic scan line */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full animate-scan"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;