import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type CoursesSectionProps = {
  theme: string;
};

type CourseListItem = {
  id: number;
  title: string;
  description?: string | null;
  progress: number;
  thumbnail?: string | null;
};

type Lesson = {
  id: number;
  title: string;
  videoUrl: string;
  order: number;
};

type CourseDetail = CourseListItem & {
  lessons: Lesson[];
};

const COURSES_API_URL = "http://localhost:8000/courses";

export default function CoursesSection({ theme }: CoursesSectionProps) {
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [isListLoading, setIsListLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseDetail | null>(
    null,
  );
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(
    null,
  );
  const [isCourseLoading, setIsCourseLoading] = useState(false);
  const [courseError, setCourseError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      setIsListLoading(true);
      setListError(null);

      try {
        const response = await fetch(COURSES_API_URL);
        if (!response.ok) {
          throw new Error("Не удалось загрузить список курсов");
        }

        const data: CourseListItem[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Некорректный ответ сервера");
        }

        if (isMounted) {
          setCourses(data);
        }
      } catch (error) {
        if (isMounted) {
          setListError(
            error instanceof Error
              ? error.message
              : "Произошла неизвестная ошибка",
          );
        }
      } finally {
        if (isMounted) {
          setIsListLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setSelectedCourse(null);
      setSelectedLessonId(null);
      setCourseError(null);
    }
  };

  const handleCourseClick = useCallback(async (courseId: number) => {
    setIsDialogOpen(true);
    setIsCourseLoading(true);
    setCourseError(null);

    try {
      const response = await fetch(`${COURSES_API_URL}/${courseId}`);

      if (!response.ok) {
        throw new Error("Не удалось загрузить информацию о курсе");
      }

      const data = await response.json();

      const normalizedLessons: Lesson[] = Array.isArray(data.lessons)
        ? data.lessons
            .map((lesson: any) => ({
              id: Number(lesson.id),
              title: lesson.title,
              videoUrl: lesson.video_url,
              order: Number(lesson.order ?? 0),
            }))
            .sort((a, b) => a.order - b.order)
        : [];

      const normalizedCourse: CourseDetail = {
        id: Number(data.id),
        title: data.title,
        description: data.description ?? "",
        progress: Number(data.progress ?? 0),
        thumbnail: data.thumbnail ?? null,
        lessons: normalizedLessons,
      };

      setSelectedCourse(normalizedCourse);
      setSelectedLessonId(normalizedLessons[0]?.id ?? null);
    } catch (error) {
      setCourseError(
        error instanceof Error
          ? error.message
          : "Произошла неизвестная ошибка",
      );
    } finally {
      setIsCourseLoading(false);
    }
  }, []);

  const activeLesson = useMemo(() => {
    if (!selectedCourse || selectedLessonId === null) {
      return null;
    }

    return (
      selectedCourse.lessons.find((lesson) => lesson.id === selectedLessonId) ??
      null
    );
  }, [selectedCourse, selectedLessonId]);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Мои курсы</h2>

      {listError && (
        <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-600">
          {listError}
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <AnimatePresence>
          {isListLoading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <motion.div
                  key={`skeleton-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Card
                    className={`${
                      theme === "dark"
                        ? "bg-gray-900 border-gray-800"
                        : "bg-gray-100 border-gray-200"
                    } shadow-xl transition`}
                  >
                    <CardContent className="p-6 space-y-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-32 w-full rounded-lg" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-9 w-full" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            : courses.map((course, idx) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow:
                      theme === "dark"
                        ? "0 0 20px rgba(255,0,0,0.35)"
                        : "0 0 20px rgba(255,0,0,0.2)",
                  }}
                >
                  <Card
                    className={`${
                      theme === "dark"
                        ? "bg-gray-900 border-red-800"
                        : "bg-gray-100 border-gray-300"
                    } shadow-xl transition`}
                  >
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3">
                        {course.title}
                      </h3>

                      {course.thumbnail && (
                        <div className="mb-4 overflow-hidden rounded-lg border border-white/10">
                          <img
                            src={course.thumbnail}
                            alt="Обложка курса"
                            className="h-32 w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {course.description && (
                        <p className="mb-4 text-sm text-muted-foreground">
                          {course.description}
                        </p>
                      )}

                      <div className="mb-4">
                        <div className="w-full bg-gray-700/50 rounded-full h-3">
                          <div
                            className="h-3 rounded-full bg-red-600"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <p className="mt-2 text-sm opacity-70">
                          Прогресс: {course.progress}%
                        </p>
                      </div>

                      <Button
                        className="bg-red-700 hover:bg-red-800 w-full"
                        onClick={() => handleCourseClick(course.id)}
                      >
                        Смотреть уроки
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
        </AnimatePresence>
      </div>

      {!isListLoading && !courses.length && !listError && (
        <p className="mt-6 text-sm text-muted-foreground">
          У вас пока нет активных курсов.
        </p>
      )}

      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>
              {selectedCourse?.title ?? "Загрузка курса"}
            </DialogTitle>
            {selectedCourse?.description && (
              <p className="text-sm text-muted-foreground">
                {selectedCourse.description}
              </p>
            )}
          </DialogHeader>

          {isCourseLoading ? (
            <div className="flex h-48 items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-red-600" />
            </div>
          ) : courseError ? (
            <p className="text-sm text-red-600">{courseError}</p>
          ) : selectedCourse ? (
            <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
              <div>
                <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl bg-black">
                  {activeLesson ? (
                    <video
                      key={`${selectedCourse.id}-${activeLesson.id}`}
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
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Содержание курса</h3>
                <ScrollArea className="h-[320px] pr-2">
                  <div className="space-y-2">
                    {selectedCourse.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => setSelectedLessonId(lesson.id)}
                        className={cn(
                          "w-full rounded-lg border p-3 text-left transition",
                          lesson.id === selectedLessonId
                            ? "border-red-600 bg-red-600/10 text-red-600"
                            : "border-border hover:border-red-500/60"
                        )}
                      >
                        <span className="block text-sm font-medium">
                          {lesson.order}. {lesson.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Выберите курс, чтобы посмотреть его содержание.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
