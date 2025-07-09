import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Подходят ли курсы для новичков?",
      answer: "Да, большинство наших курсов разработаны специально для людей без опыта программирования. Мы начинаем с самых основ и постепенно переходим к более сложным темам."
    },
    {
      question: "Сколько времени нужно уделять обучению?",
      answer: "Рекомендуется заниматься 10-15 часов в неделю. Это позволит комфортно усваивать материал и выполнять практические задания."
    },
    {
      question: "Есть ли поддержка после окончания курса?",
      answer: "Да, мы предоставляем поддержку в течение 6 месяцев после завершения курса, включая помощь с трудоустройством и консультации по проектам."
    },
    {
      question: "Какие технические требования для обучения?",
      answer: "Вам понадобится компьютер с доступом в интернет. Все необходимое программное обеспечение бесплатное, мы поможем с установкой и настройкой."
    },
    {
      question: "Можно ли получить сертификат по окончанию?",
      answer: "Да, после успешного завершения курса и защиты финального проекта вы получите сертификат, который можно указать в резюме."
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ответы на самые популярные вопросы о наших курсах
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left text-primary font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;