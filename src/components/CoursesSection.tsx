import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, Globe, Server } from "lucide-react";

const CoursesSection = () => {
  const courses = [
    {
      icon: Code,
      title: "Python с нуля",
      description: "Изучите основы программирования на Python. От переменных до объектно-ориентированного программирования.",
      duration: "3 месяца",
      level: "Начинающий"
    },
    {
      icon: Database,
      title: "Data Science",
      description: "Анализ данных, машинное обучение, работа с библиотеками pandas, numpy, scikit-learn.",
      duration: "4 месяца",
      level: "Средний"
    },
    {
      icon: Globe,
      title: "Web-разработка",
      description: "Создание современных веб-приложений с использованием HTML, CSS, JavaScript и React.",
      duration: "5 месяцев",
      level: "Начинающий"
    },
    {
      icon: Server,
      title: "Backend на Django и Flask",
      description: "Разработка серверной части приложений, API, работа с базами данных.",
      duration: "4 месяца",
      level: "Средний"
    }
  ];

  return (
    <section id="courses" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Наши курсы
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Выберите направление, которое вам интересно, и начните путь в IT
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {courses.map((course, index) => {
            const IconComponent = course.icon;
            return (
              <Card key={index} className="hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-border">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-gradient-accent p-3 rounded-lg">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-primary">{course.title}</CardTitle>
                      <div className="flex space-x-4 text-sm text-muted-foreground mt-1">
                        <span>{course.duration}</span>
                        <span>•</span>
                        <span>{course.level}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {course.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="cta" className="w-full">
                    Подробнее
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;