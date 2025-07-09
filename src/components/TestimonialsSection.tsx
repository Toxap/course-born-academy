import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Алексей Петров",
      role: "Junior Python Developer",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "За 3 месяца с нуля освоил Python и получил первую работу. Наставники действительно помогли разобраться во всех тонкостях.",
      rating: 5
    },
    {
      name: "Мария Сидорова",
      role: "Frontend Developer",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "Отличные курсы по веб-разработке! Особенно понравился индивидуальный подход и помощь с портфолио.",
      rating: 5
    },
    {
      name: "Дмитрий Козлов",
      role: "Data Scientist",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "Курс по Data Science превзошел ожидания. Много практики с реальными данными и проектами.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Отзывы студентов
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Истории успеха наших выпускников
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-accent mb-4" />
                
                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Testimonial text */}
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                {/* Author info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;