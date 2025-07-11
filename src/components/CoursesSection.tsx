import { Button } from "@/components/ui/button";
import { Code, Database, Globe, Server, ChevronLeft, ChevronRight, Clock, Award, BookOpen, Users, Target } from "lucide-react";
import { useState } from "react";

const CoursesSection = () => {
  const [currentCourse, setCurrentCourse] = useState(0);

  const courses = [
    {
      id: 1,
      title: "Java-Разработчик",
      description: "Полный курс Java разработки от основ до создания корпоративных приложений. Изучите объектно-ориентированное программирование, базы данных и Spring Framework.",
      features: [
        "Основы Java и ООП",
        "Работа с базами данных",
        "Spring Framework", 
        "Микросервисная архитектура",
        "Тестирование приложений"
      ],
      duration: "6 месяцев",
      level: "Начинающий",
      students: "2,500+",
      employment: "87%",
      icon: Code
    },
    {
      id: 2,
      title: "Frontend Буткемп",
      description: "Интенсивный курс frontend разработки. Изучите современные технологии: React, TypeScript, работу с API и создание адаптивных интерфейсов.",
      features: [
        "HTML5, CSS3, JavaScript",
        "React и TypeScript",
        "Работа с API",
        "Адаптивный дизайн",
        "Деплой проектов"
      ],
      duration: "3 месяца",
      level: "Начинающий",
      students: "1,800+", 
      employment: "82%",
      icon: Globe
    },
    {
      id: 3,
      title: "Backend Буткемп",
      description: "Изучите серверную разработку с Node.js. Создавайте API, работайте с базами данных, изучите архитектуру и безопасность приложений.",
      features: [
        "Node.js и Express",
        "MongoDB/PostgreSQL",
        "REST API и GraphQL",
        "Аутентификация",
        "Микросервисы"
      ],
      duration: "4 месяца",
      level: "Продвинутый",
      students: "1,200+",
      employment: "91%",
      icon: Server
    },
    {
      id: 4,
      title: "Data Science",
      description: "Анализ данных и машинное обучение. Изучите Python, работу с большими данными и создание предсказательных моделей.",
      features: [
        "Python для анализа данных",
        "Pandas, NumPy, Matplotlib",
        "Машинное обучение",
        "Работа с Big Data",
        "Развертывание ML-моделей"
      ],
      duration: "5 месяцев",
      level: "Продвинутый", 
      students: "900+",
      employment: "78%",
      icon: Database
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
    <section id="courses" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-200 mb-4">
            Образовательные программы
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Выберите направление и начните своё обучение в IT
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {courses.map((courseItem, index) => {
              const Icon = courseItem.icon;
              return (
                  <button
                    key={index}
                    onClick={() => setCurrentCourse(index)}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                      index === currentCourse
                        ? 'bg-red-900 border-red-700 text-white animate-pulse'
                        : 'bg-slate-800 border-slate-700 text-gray-400 hover:border-slate-600 hover:bg-slate-700'
                    }`}
                  >
                  <Icon className="w-6 h-6" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <button
              onClick={prevCourse}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 hover:bg-red-900/20 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextCourse}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 hover:bg-red-900/20 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div 
              key={currentCourse}
              className="bg-slate-800 rounded-2xl border-2 border-red-900/50 overflow-hidden shadow-xl animate-fade-in"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-red-900 rounded-lg hover:bg-red-800 transition-all duration-300 hover:scale-110">
                      <course.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-200">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-gray-300 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-200 flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-red-400" />
                      <span>Что изучите:</span>
                    </h4>
                    <ul className="space-y-2">
                      {course.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3 animate-fade-in hover:translate-x-2 transition-transform duration-200" style={{animationDelay: `${index * 100}ms`}}>
                          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-red-900 hover:bg-red-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in">
                    Начать обучение
                  </Button>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-6 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-red-400 animate-pulse" />
                        <span className="text-sm text-gray-400">Длительность</span>
                      </div>
                      <p className="text-white font-semibold">{course.duration}</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center space-x-2 mb-2">
                        <Award className="w-4 h-4 text-red-400 animate-pulse" />
                        <span className="text-sm text-gray-400">Уровень</span>
                      </div>
                      <p className="text-white font-semibold">{course.level}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <Users className="w-4 h-4 text-red-400 animate-pulse" />
                        <span className="text-sm text-gray-400">Студентов</span>
                      </div>
                      <p className="text-white font-semibold">{course.students}</p>
                    </div>
                    <div className="text-center p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <Target className="w-4 h-4 text-red-400 animate-pulse" />
                        <span className="text-sm text-gray-400">Трудоустройство</span>
                      </div>
                      <p className="text-white font-semibold">{course.employment}</p>
                    </div>
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