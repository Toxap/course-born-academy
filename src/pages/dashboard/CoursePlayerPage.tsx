import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const COURSES_API_URL = "http://localhost:8000/courses";

type Lesson = {
  id: number;
  title: string;
  videoUrl: string;
  order: number;
};

type LessonResponse = {
  id: number | string;
  title?: string;
  video_url?: string;
  order?: number | string | null;
};

type CourseResponse = {
  id: number | string;
  title: string;
  description?: string | null;
  lessons?: LessonResponse[];
};

type CourseDetail = {
  id: number;
  title: string;
  description?: string | null;
  lessons: Lesson[];
};

export default function CoursePlayerPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (!courseId) {
      setError("Курс не найден");
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const fetchCourse = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${COURSES_API_URL}/${courseId}`);
        if (!response.ok) {
          throw new Error("Не удалось загрузить информацию о курсе");
        }

        const data: CourseResponse = await response.json();

        const lessons: Lesson[] = Array.isArray(data.lessons)
          ? data.lessons
              .map((lesson) => ({
                id: Number(lesson.id),
                title: lesson.title ?? "Без названия",
                videoUrl: lesson.video_url ?? "",
                order: Number(lesson.order ?? 0),
              }))
              .sort((a, b) => a.order - b.order)
          : [];

        const normalizedCourse: CourseDetail = {
          id: Number(data.id),
          title: data.title,
          description: data.description ?? "",
          lessons,
        };

        if (isMounted) {
          setCourse(normalizedCourse);
          setSelectedLessonId(lessons[0]?.id ?? null);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Произошла неизвестная ошибка",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCourse();

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  const activeLesson = useMemo(() => {
    if (!course || selectedLessonId === null) {
      return null;
    }

    return course.lessons.find((lesson) => lesson.id === selectedLessonId) ?? null;
  }, [course, selectedLessonId]);

  const handleBackClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-black text-white"
          : "bg-white text-black"
      } min-h-screen`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-8">
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleBackClick}>
            Назад
          </Button>
          <h1 className="text-2xl font-bold">
            {course?.title ?? (isLoading ? "Загрузка курса" : "Курс")}
          </h1>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <Skeleton className="aspect-video w-full rounded-xl" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="h-12 w-full" />
              ))}
            </div>
          </div>
        ) : course && !error ? (
          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <div>
              <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl bg-black">
                {activeLesson ? (
                  <video
                    key={`${course.id}-${activeLesson.id}`}
                    className="h-full w-full object-contain"
                    controls
                    preload="metadata"
                    src={activeLesson.videoUrl}
                  >
                    Ваш браузер не поддерживает воспроизведение видео.
                  </video>
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                    Выберите урок, чтобы начать просмотр
                  </div>
                )}
              </AspectRatio>

              {activeLesson && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Сейчас воспроизводится: {activeLesson.title}
                </p>
              )}

              {course.description && (
                <p className="mt-6 text-sm text-muted-foreground">{course.description}</p>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Содержание курса</h2>
              {course.lessons.length ? (
                <ScrollArea className="h-[360px] pr-2">
                  <div className="space-y-2">
                    {course.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => setSelectedLessonId(lesson.id)}
                        className={cn(
                          "w-full rounded-lg border p-3 text-left transition",
                          lesson.id === selectedLessonId
                            ? "border-red-600 bg-red-600/10 text-red-600"
                            : "border-border hover:border-red-500/60",
                        )}
                      >
                        <span className="block text-sm font-medium">
                          {lesson.order}. {lesson.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <p className="text-sm text-muted-foreground">
                  У этого курса пока нет уроков.
                </p>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
