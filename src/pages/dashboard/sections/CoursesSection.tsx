import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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

const COURSES_API_URL = "http://localhost:8000/courses";

export default function CoursesSection({ theme }: CoursesSectionProps) {
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [isListLoading, setIsListLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleCourseClick = useCallback(
    (courseId: number) => {
      navigate(`/dashboard/courses/${courseId}`);
    },
    [navigate],
  );

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

    </section>
  );
}
