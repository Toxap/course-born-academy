import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Базовый",
      price: "2,999",
      period: "месяц",
      description: "Идеально для начинающих",
      isPopular: false,
      features: [
        "Доступ к базовым курсам",
        "2 часа занятий в неделю",
        "Чат поддержка",
        "Сертификат об окончании",
        "Мобильное приложение"
      ]
    },
    {
      name: "Стандарт",
      price: "4,999",
      period: "месяц",
      description: "Самый популярный выбор",
      isPopular: true,
      features: [
        "Доступ ко всем курсам",
        "4 часа занятий в неделю",
        "Персональный куратор",
        "Практические проекты",
        "Сертификат об окончании",
        "Мобильное приложение",
        "Группа в Telegram"
      ]
    },
    {
      name: "Премиум",
      price: "7,999",
      period: "месяц",
      description: "Максимальный результат",
      isPopular: false,
      features: [
        "Доступ ко всем курсам",
        "Неограниченные занятия",
        "Персональный ментор",
        "1-на-1 консультации",
        "Реальные проекты",
        "Помощь в трудоустройстве",
        "Сертификат об окончании",
        "Мобильное приложение",
        "VIP группа в Telegram"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Выберите свой тариф
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Доступные планы обучения для достижения ваших целей в программировании
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative transition-all duration-300 hover:shadow-large ${
                plan.isPopular 
                  ? 'border-primary shadow-medium scale-105' 
                  : 'hover:scale-105'
              }`}
            >
              {plan.isPopular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground">
                  Популярный
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-foreground">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}₽
                  </span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.isPopular ? "hero" : "outline"} 
                  className="w-full mt-6"
                  size="lg"
                >
                  Выбрать план
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Все планы включают 14-дневную гарантию возврата средств
          </p>
          <Button variant="ghost" className="text-primary">
            Сравнить все планы →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;