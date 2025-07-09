import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, Globe, Server, ChevronLeft, ChevronRight, Users, Target, Clock, Award } from "lucide-react";
import { useState } from "react";

const CoursesSection = () => {
  const [currentCourse, setCurrentCourse] = useState(0);

  const courses = [
    {
      id: 1,
      title: "Java-Разработчик",
      subtitle: "Профессия",
      description: "Изучите Java от основ до продвинутого уровня. Научитесь создавать корпоративные приложения и работать с базами данных.",
      features: [
        "Основы Java и ООП",
        "Работа с базами данных",
        "Spring Framework",
        "Микросервисы",
        "Тестирование приложений"
      ],
      duration: "6 месяцев",
      level: "Начинающий",
      students: "2,500+",
      employment: "87%",
      color: "from-blue-500 to-blue-700",
      icon: Code,
      image: "👨‍💻"
    },
    {
      id: 2,
      title: "Frontend Буткемп",
      subtitle: "Интенсив",
      description: "Быстрый старт в frontend разработке. React, TypeScript, современные инструменты и методологии.",
      features: [
        "HTML5, CSS3, JavaScript",
        "React и TypeScript",
        "Работа с API",
        "Responsive дизайн",
        "Деплой проектов"
      ],
      duration: "3 месяца",
      level: "Начинающий",
      students: "1,800+",
      employment: "82%",
      color: "from-cyan-500 to-cyan-700",
      icon: Globe,
      image: "🎨"
    },
    {
      id: 3,
      title: "Backend Буткемп",
      subtitle: "Интенсив",
      description: "Серверная разработка с Node.js. API, базы данных, архитектура и безопасность веб-приложений.",
      features: [
        "Node.js и Express",
        "Базы данных MongoDB/PostgreSQL",
        "REST API и GraphQL",
        "Аутентификация",
        "Микросервисная архитектура"
      ],
      duration: "4 месяца",
      level: "Средний",
      students: "1,200+",
      employment: "91%",
      color: "from-green-500 to-green-700",
      icon: Server,
      image: "⚙️"
    },
    {
      id: 4,
      title: "Data Science",
      subtitle: "Профессия",
      description: "Анализ данных, машинное обучение, работа с большими данными и создание ML-моделей.",
      features: [
        "Python для Data Science",
        "Pandas, NumPy, Matplotlib",
        "Машинное обучение",
        "Работа с Big Data",
        "Deployment ML-моделей"
      ],
      duration: "5 месяцев",
      level: "Средний",
      students: "900+",
      employment: "78%",
      color: "from-purple-500 to-purple-700",
      icon: Database,
      image: "📊"
    }
  ];

  const nextCourse = () => {
    setCurrentCourse((prev) => (prev + 1) % courses.length);
  };

  const prevCourse = () => {
    setCurrentCourse((prev) => (prev - 1 + courses.length) % courses.length);
  };

  const course = courses[currentCourse];

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-rose-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-rose-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-rose-300/5 rounded-full blur-lg animate-bounce"></div>
        
        {/* Floating elements */}
        <div className="absolute top-16 right-1/4 text-rose-400/20 animate-float">
          <div className="text-2xl font-mono transform rotate-12">{'</>'}</div>
        </div>
        <div className="absolute bottom-32 left-1/3 text-rose-300/20 animate-float-delayed">
          <div className="text-3xl font-mono transform -rotate-12">{'{ }'}</div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Образовательные
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent mb-6">
            продукты
          </h3>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Выберите направление и начните путь к карьере в IT
          </p>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {courses.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCourse(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentCourse
                    ? 'bg-rose-400 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Course card */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Navigation arrows */}
            <button
              onClick={prevCourse}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full border border-rose-400/30 flex items-center justify-center text-rose-400 hover:bg-gray-700/80 hover:border-rose-400/60 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextCourse}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full border border-rose-400/30 flex items-center justify-center text-rose-400 hover:bg-gray-700/80 hover:border-rose-400/60 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Course content */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left side - Course info */}
                <div className="p-8 lg:p-12">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${course.color} shadow-lg`}>
                        <course.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-rose-400 font-medium uppercase tracking-wide">
                          {course.subtitle}
                        </p>
                        <h3 className="text-3xl font-bold text-white">
                          {course.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed">
                      {course.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="text-xl font-semibold text-white">Что изучите:</h4>
                      <ul className="space-y-2">
                        {course.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-700/50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-5 h-5 text-rose-400" />
                          <span className="text-sm text-gray-400">Длительность</span>
                        </div>
                        <p className="text-white font-semibold">{course.duration}</p>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Award className="w-5 h-5 text-rose-400" />
                          <span className="text-sm text-gray-400">Уровень</span>
                        </div>
                        <p className="text-white font-semibold">{course.level}</p>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Записаться
                    </Button>
                  </div>
                </div>

                {/* Right side - Visual */}
                <div className="relative p-8 lg:p-12 flex items-center justify-center">
                  <div className="relative">
                    {/* Main illustration */}
                    <div className="text-8xl mb-6 text-center animate-float">
                      {course.image}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-700/30 backdrop-blur-sm rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <Users className="w-5 h-5 text-rose-400" />
                          <span className="text-sm text-gray-400">Студентов</span>
                        </div>
                        <p className="text-white font-bold text-lg">{course.students}</p>
                      </div>
                      <div className="bg-gray-700/30 backdrop-blur-sm rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <Target className="w-5 h-5 text-rose-400" />
                          <span className="text-sm text-gray-400">Трудоустройство</span>
                        </div>
                        <p className="text-white font-bold text-lg">{course.employment}</p>
                      </div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-rose-400/20 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-rose-500/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 -right-8 w-4 h-4 bg-rose-300/20 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;