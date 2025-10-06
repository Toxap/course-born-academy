import { useMemo, useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Globe2, PlayCircle } from "lucide-react";
import {
  compareAsc,
  format,
  isAfter,
  isSameDay,
  parseISO,
  startOfDay,
} from "date-fns";
import { ru } from "date-fns/locale";

interface WebinarItem {
  id: string;
  title: string;
  start: string;
  duration: string;
  platform: string;
  speaker: string;
  description: string;
  tags: string[];
  level: string;
}

const WEBINARS: WebinarItem[] = [
  {
    id: "w-brand-identity",
    title: "Создание фирменного стиля: от идеи до гайда",
    start: "2024-09-05T19:00:00+03:00",
    duration: "90 минут",
    platform: "Zoom",
    speaker: "Анна Орлова",
    description:
      "Разбираем, как собрать полноценный брендбук и не упустить важные детали при работе с заказчиком.",
    tags: ["Брендинг", "Практика"],
    level: "Middle",
  },
  {
    id: "w-motion-tools",
    title: "Motion-дизайн в Figma и After Effects",
    start: "2024-09-12T18:30:00+03:00",
    duration: "75 минут",
    platform: "YouTube Live",
    speaker: "Игорь Соколов",
    description:
      "Покажем, как оживить интерфейсы с помощью анимации и подготовить исходники для разработчиков.",
    tags: ["Motion", "Инструменты"],
    level: "Middle",
  },
  {
    id: "w-ux-research",
    title: "UX-исследования: быстрые методики в продакт-команде",
    start: "2024-09-19T17:00:00+03:00",
    duration: "80 минут",
    platform: "Zoom",
    speaker: "Лена Дорошина",
    description:
      "Разберём пошаговые сценарии юзабилити-тестов и научимся быстро проверять гипотезы.",
    tags: ["UX", "Research"],
    level: "Junior+",
  },
  {
    id: "w-product-analytics",
    title: "Продуктовая аналитика для дизайнеров",
    start: "2024-09-26T19:30:00+03:00",
    duration: "70 минут",
    platform: "Webinar.ru",
    speaker: "Дмитрий Корнеев",
    description:
      "Учимся читать продуктовые метрики и превращать цифры в дизайн-решения.",
    tags: ["Аналитика", "Метрики"],
    level: "Middle",
  },
  {
    id: "w-portfolio-review",
    title: "Разбор портфолио студентов",
    start: "2024-10-03T18:00:00+03:00",
    duration: "60 минут",
    platform: "Zoom",
    speaker: "Команда кураторов",
    description:
      "Живой фидбек от кураторов и советы, как подготовиться к собеседованию.",
    tags: ["Портфолио", "Карьерный рост"],
    level: "All levels",
  },
];

export default function WebinarsSection() {
  const webinars = useMemo(
    () =>
      WEBINARS.map((webinar) => {
        const startDate = parseISO(webinar.start);
        return {
          ...webinar,
          startDate,
          day: startOfDay(startDate),
        };
      }).sort((a, b) => compareAsc(a.startDate, b.startDate)),
    [],
  );

  const defaultSelectedDate = useMemo(() => {
    const now = new Date();
    const upcoming = webinars.find(
      (webinar) => isAfter(webinar.startDate, now) || isSameDay(webinar.startDate, now),
    );

    return upcoming?.day ?? webinars[0]?.day ?? startOfDay(now);
  }, [webinars]);

  const [selectedDate, setSelectedDate] = useState<Date>(defaultSelectedDate);

  const webinarsForSelectedDate = useMemo(
    () => webinars.filter((webinar) => isSameDay(webinar.day, selectedDate)),
    [webinars, selectedDate],
  );

  const webinarDays = useMemo(() => {
    const unique = new Map<string, Date>();

    for (const webinar of webinars) {
      const key = webinar.day.toISOString();
      if (!unique.has(key)) {
        unique.set(key, webinar.day);
      }
    }

    return Array.from(unique.values());
  }, [webinars]);

  const upcomingWebinars = useMemo(() => {
    const now = new Date();
    return webinars.filter((webinar) => isAfter(webinar.startDate, now));
  }, [webinars]);

  return (
    <section className="relative z-20">
      <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
        <Card className="border-dashed bg-background/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Календарь вебинаров</CardTitle>
            <CardDescription>
              Выберите дату, чтобы увидеть запланированные вебинары.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(startOfDay(date))}
              locale={ru}
              modifiers={{ webinar: webinarDays }}
              modifiersClassNames={{
                webinar:
                  "relative after:absolute after:-bottom-1 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rounded-full after:bg-red-500",
              }}
            />
            <p className="mt-4 text-sm text-muted-foreground">
              Красной точкой отмечены даты с ближайшими событиями.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>
                Расписание на {format(selectedDate, "d MMMM", { locale: ru })}
              </CardTitle>
              <CardDescription>
                {webinarsForSelectedDate.length > 0
                  ? "Подключайтесь вовремя, чтобы не пропустить важные темы."
                  : "На выбранную дату вебинары не запланированы."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {webinarsForSelectedDate.length > 0 ? (
                webinarsForSelectedDate.map((webinar) => (
                  <div
                    key={webinar.id}
                    className="space-y-3 rounded-lg border p-4 transition-colors hover:border-red-400/70"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold">{webinar.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {webinar.description}
                        </p>
                      </div>
                      <Badge variant="secondary">{webinar.level}</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {format(webinar.startDate, "HH:mm", { locale: ru })} · {webinar.duration}
                      </span>
                      <span className="flex items-center gap-2">
                        <Globe2 className="h-4 w-4" />
                        {webinar.platform}
                      </span>
                      <span className="flex items-center gap-2">
                        <PlayCircle className="h-4 w-4" />
                        {webinar.speaker}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {webinar.tags.map((tag) => (
                        <Badge
                          key={`${webinar.id}-${tag}`}
                          variant="outline"
                          className="border-red-400/60 text-red-500"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                  Выберите другую дату, чтобы посмотреть ближайшие события или
                  загляните в список предстоящих вебинаров ниже.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Предстоящие вебинары</CardTitle>
              <CardDescription>
                Планируйте участие и отмечайте важные темы заранее.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingWebinars.length > 0 ? (
                upcomingWebinars.map((webinar) => (
                  <div
                    key={`upcoming-${webinar.id}`}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4 transition-colors hover:border-red-400/70"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        {format(webinar.startDate, "d MMMM, HH:mm", { locale: ru })}
                      </p>
                      <p className="text-base font-semibold">{webinar.title}</p>
                    </div>
                    <div className="flex flex-wrap justify-end gap-2">
                      {webinar.tags.slice(0, 2).map((tag) => (
                        <Badge key={`upcoming-${webinar.id}-${tag}`} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Пока нет запланированных вебинаров. Загляните позже!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
