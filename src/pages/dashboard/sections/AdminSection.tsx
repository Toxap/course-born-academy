import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, RefreshCcw, Save, Trash2 } from "lucide-react";

import type { DashboardUser } from "../UserDashboard";

const API_BASE_URL = "http://localhost:8000";

interface AdminSectionProps {
  theme: string;
  user: DashboardUser | null;
  setUser: Dispatch<SetStateAction<DashboardUser | null>>;
}

interface AdminCourseListItem {
  id: number;
  title: string;
  description: string;
  progress: number;
  thumbnail: string | null;
}

interface AdminLesson {
  id: number;
  title: string;
  video_url: string;
  order: number;
}

interface AdminCourseDetail extends AdminCourseListItem {
  lessons: AdminLesson[];
}

const emptyCourseForm = {
  title: "",
  description: "",
  thumbnail: "",
};

const emptyLessonForm = {
  title: "",
  video_url: "",
  order: "",
};

export default function AdminSection({ theme, user, setUser }: AdminSectionProps) {
  const [tab, setTab] = useState("users");
  const [usersList, setUsersList] = useState<DashboardUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [courses, setCourses] = useState<AdminCourseListItem[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [coursesError, setCoursesError] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<AdminCourseDetail | null>(null);
  const [courseLoading, setCourseLoading] = useState(false);
  const [newCourseForm, setNewCourseForm] = useState(emptyCourseForm);
  const [creatingCourse, setCreatingCourse] = useState(false);
  const [lessonForm, setLessonForm] = useState(emptyLessonForm);
  const [lessonSaving, setLessonSaving] = useState<Record<number, boolean>>({});
  const [userSaving, setUserSaving] = useState<Record<number, boolean>>({});
  const [updatingCourse, setUpdatingCourse] = useState(false);

  const isDark = theme === "dark";
  const { toast } = useToast();

  const adminHeaders = useMemo(() => {
    if (!user) return {};
    return {
      "X-User-Id": String(user.id),
    } as Record<string, string>;
  }, [user]);

  useEffect(() => {
    if (!user?.is_admin) {
      return;
    }
    void fetchUsers();
    void fetchCourses();
  }, [user?.id, user?.is_admin]);

  useEffect(() => {
    if (!user?.is_admin || selectedCourseId === null) {
      return;
    }
    void fetchCourseDetail(selectedCourseId);
  }, [selectedCourseId, user?.is_admin]);

  const fetchUsers = async () => {
    if (!user?.is_admin) return;
    setUsersLoading(true);
    setUsersError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/users/`, {
        headers: adminHeaders,
      });
      if (!response.ok) {
        throw new Error("Не удалось загрузить пользователей");
      }
      const data = (await response.json()) as DashboardUser[];
      setUsersList(data);
    } catch (error) {
      console.error(error);
      setUsersError(
        error instanceof Error ? error.message : "Произошла ошибка при загрузке пользователей",
      );
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchCourses = async () => {
    if (!user?.is_admin) return;
    setCoursesLoading(true);
    setCoursesError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/courses/`);
      if (!response.ok) {
        throw new Error("Не удалось загрузить курсы");
      }
      const data = (await response.json()) as AdminCourseListItem[];
      setCourses(data);
      if (data.length && selectedCourseId === null) {
        setSelectedCourseId(data[0].id);
      }
    } catch (error) {
      console.error(error);
      setCoursesError(
        error instanceof Error ? error.message : "Произошла ошибка при загрузке курсов",
      );
    } finally {
      setCoursesLoading(false);
    }
  };

  const fetchCourseDetail = async (courseId: number) => {
    setCourseLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${courseId}`);
      if (!response.ok) {
        throw new Error("Не удалось загрузить курс");
      }
      const data = (await response.json()) as AdminCourseDetail;
      setSelectedCourse({
        ...data,
        lessons: [...data.lessons].sort((a, b) => a.order - b.order),
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Ошибка",
        description:
          error instanceof Error ? error.message : "Не удалось загрузить данные курса",
        variant: "destructive",
      });
    } finally {
      setCourseLoading(false);
    }
  };

  const handleUserFieldChange = <K extends keyof DashboardUser>(
    id: number,
    field: K,
    value: DashboardUser[K],
  ) => {
    setUsersList((prev) =>
      prev.map((userItem) => (userItem.id === id ? { ...userItem, [field]: value } : userItem)),
    );
  };

  const handleSaveUser = async (userToSave: DashboardUser) => {
    if (!user?.is_admin) return;
    setUserSaving((prev) => ({ ...prev, [userToSave.id]: true }));
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userToSave.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...adminHeaders,
        },
        body: JSON.stringify({
          name: userToSave.name,
          email: userToSave.email,
          avatar: userToSave.avatar,
          is_admin: userToSave.is_admin,
        }),
      });
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const detail = (errorBody?.detail as string | undefined) ?? "Не удалось сохранить пользователя";
        throw new Error(detail);
      }
      const updated = (await response.json()) as DashboardUser;
      setUsersList((prev) =>
        prev.map((item) => (item.id === updated.id ? { ...item, ...updated } : item)),
      );
      if (user && user.id === updated.id) {
        setUser(updated);
      }
      toast({ title: "Изменения сохранены" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Ошибка",
        description:
          error instanceof Error ? error.message : "Не удалось обновить пользователя",
        variant: "destructive",
      });
    } finally {
      setUserSaving((prev) => ({ ...prev, [userToSave.id]: false }));
    }
  };

  const handleCreateCourse = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user?.is_admin) return;
    setCreatingCourse(true);
    try {
      const response = await fetch(`${API_BASE_URL}/courses/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...adminHeaders,
        },
        body: JSON.stringify({
          ...newCourseForm,
          lessons: [],
        }),
      });
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const detail = (errorBody?.detail as string | undefined) ?? "Не удалось создать курс";
        throw new Error(detail);
      }
      const createdCourse = (await response.json()) as AdminCourseDetail;
      const courseListItem: AdminCourseListItem = {
        id: createdCourse.id,
        title: createdCourse.title,
        description: createdCourse.description,
        progress: createdCourse.progress,
        thumbnail: createdCourse.thumbnail,
      };
      setCourses((prev) => [...prev, courseListItem]);
      setSelectedCourseId(createdCourse.id);
      setSelectedCourse(createdCourse);
      setNewCourseForm(emptyCourseForm);
      toast({ title: "Курс создан" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось создать курс",
        variant: "destructive",
      });
    } finally {
      setCreatingCourse(false);
    }
  };

  const handleCourseFieldChange = <K extends keyof AdminCourseDetail>(
    field: K,
    value: AdminCourseDetail[K],
  ) => {
    setSelectedCourse((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleUpdateCourse = async () => {
    if (!user?.is_admin || !selectedCourse) return;
    setUpdatingCourse(true);
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${selectedCourse.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...adminHeaders,
        },
        body: JSON.stringify({
          title: selectedCourse.title,
          description: selectedCourse.description,
          progress: selectedCourse.progress,
          thumbnail: selectedCourse.thumbnail,
        }),
      });
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const detail = (errorBody?.detail as string | undefined) ?? "Не удалось обновить курс";
        throw new Error(detail);
      }
      const updatedCourse = (await response.json()) as AdminCourseDetail;
      setSelectedCourse(updatedCourse);
      setCourses((prev) =>
        prev.map((course) =>
          course.id === updatedCourse.id
            ? {
                id: updatedCourse.id,
                title: updatedCourse.title,
                description: updatedCourse.description,
                progress: updatedCourse.progress,
                thumbnail: updatedCourse.thumbnail,
              }
            : course,
        ),
      );
      toast({ title: "Курс обновлён" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось обновить курс",
        variant: "destructive",
      });
    } finally {
      setUpdatingCourse(false);
    }
  };

  const handleDeleteCourse = async () => {
    if (!user?.is_admin || !selectedCourse) return;
    const confirmed = window.confirm(
      `Удалить курс «${selectedCourse.title}» вместе со всеми уроками?`,
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_BASE_URL}/courses/${selectedCourse.id}`, {
        method: "DELETE",
        headers: adminHeaders,
      });
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const detail = (errorBody?.detail as string | undefined) ?? "Не удалось удалить курс";
        throw new Error(detail);
      }
      setCourses((prev) => prev.filter((course) => course.id !== selectedCourse.id));
      setSelectedCourse(null);
      setSelectedCourseId(null);
      toast({ title: "Курс удалён" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось удалить курс",
        variant: "destructive",
      });
    }
  };

  const handleAddLesson = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user?.is_admin || !selectedCourse) return;
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${selectedCourse.id}/lessons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...adminHeaders,
        },
        body: JSON.stringify({
          title: lessonForm.title,
          video_url: lessonForm.video_url,
          order: lessonForm.order ? Number(lessonForm.order) : undefined,
        }),
      });
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const detail = (errorBody?.detail as string | undefined) ?? "Не удалось добавить урок";
        throw new Error(detail);
      }
      const updatedCourse = (await response.json()) as AdminCourseDetail;
      setSelectedCourse(updatedCourse);
      setLessonForm(emptyLessonForm);
      toast({ title: "Урок добавлен" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось добавить урок",
        variant: "destructive",
      });
    }
  };

  const handleLessonFieldChange = (
    lessonId: number,
    field: keyof AdminLesson,
    value: string,
  ) => {
    setSelectedCourse((prev) =>
      prev
        ? {
            ...prev,
            lessons: prev.lessons.map((lesson) =>
              lesson.id === lessonId
                ? {
                    ...lesson,
                    [field]: field === "order" ? Number(value) || 0 : value,
                  }
                : lesson,
            ),
          }
        : prev,
    );
  };

  const handleSaveLesson = async (lesson: AdminLesson) => {
    if (!user?.is_admin || !selectedCourse) return;
    setLessonSaving((prev) => ({ ...prev, [lesson.id]: true }));
    try {
      const response = await fetch(
        `${API_BASE_URL}/courses/${selectedCourse.id}/lessons/${lesson.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...adminHeaders,
          },
          body: JSON.stringify({
            title: lesson.title,
            video_url: lesson.video_url,
            order: lesson.order,
          }),
        },
      );
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const detail = (errorBody?.detail as string | undefined) ?? "Не удалось сохранить урок";
        throw new Error(detail);
      }
      const updatedLesson = (await response.json()) as AdminLesson;
      setSelectedCourse((prev) =>
        prev
          ? {
              ...prev,
              lessons: prev.lessons
                .map((item) => (item.id === updatedLesson.id ? updatedLesson : item))
                .sort((a, b) => a.order - b.order),
            }
          : prev,
      );
      toast({ title: "Урок обновлён" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось обновить урок",
        variant: "destructive",
      });
    } finally {
      setLessonSaving((prev) => ({ ...prev, [lesson.id]: false }));
    }
  };

  const handleDeleteLesson = async (lessonId: number) => {
    if (!user?.is_admin || !selectedCourse) return;
    const confirmed = window.confirm("Удалить урок?");
    if (!confirmed) return;
    try {
      const response = await fetch(
        `${API_BASE_URL}/courses/${selectedCourse.id}/lessons/${lessonId}`,
        {
          method: "DELETE",
          headers: adminHeaders,
        },
      );
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const detail = (errorBody?.detail as string | undefined) ?? "Не удалось удалить урок";
        throw new Error(detail);
      }
      setSelectedCourse((prev) =>
        prev
          ? {
              ...prev,
              lessons: prev.lessons.filter((lesson) => lesson.id !== lessonId),
            }
          : prev,
      );
      toast({ title: "Урок удалён" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось удалить урок",
        variant: "destructive",
      });
    }
  };

  if (!user?.is_admin) {
    return (
      <div
        className={`rounded-2xl border p-10 text-center text-lg font-medium ${
          isDark ? "bg-gray-900 border-red-800" : "bg-white border-gray-200"
        }`}
      >
        Доступ к админ-панели есть только у администраторов.
      </div>
    );
  }

  const cardClasses = isDark ? "bg-gray-900 border-red-800" : "bg-white border-gray-200";

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold">Админ-панель</h2>
          <p className="text-sm text-muted-foreground">
            Управляйте пользователями, курсами и уроками из одного места.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => void fetchUsers()} disabled={usersLoading}>
            <RefreshCcw className="mr-2 h-4 w-4" /> Обновить пользователей
          </Button>
          <Button variant="outline" onClick={() => void fetchCourses()} disabled={coursesLoading}>
            <RefreshCcw className="mr-2 h-4 w-4" /> Обновить курсы
          </Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Пользователи</TabsTrigger>
          <TabsTrigger value="courses">Курсы и уроки</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card className={cardClasses}>
            <CardHeader>
              <CardTitle>Управление пользователями</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {usersError && (
                <p className="text-sm text-red-400">{usersError}</p>
              )}
              {usersLoading ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">ID</TableHead>
                        <TableHead>Имя</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Аватар</TableHead>
                        <TableHead className="w-32">Администратор</TableHead>
                        <TableHead className="w-32 text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersList.map((userItem) => (
                        <TableRow key={userItem.id}>
                          <TableCell className="font-semibold">{userItem.id}</TableCell>
                          <TableCell>
                            <Input
                              value={userItem.name}
                              onChange={(event) =>
                                handleUserFieldChange(userItem.id, "name", event.target.value)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="email"
                              value={userItem.email}
                              onChange={(event) =>
                                handleUserFieldChange(userItem.id, "email", event.target.value)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={userItem.avatar ?? ""}
                              onChange={(event) =>
                                handleUserFieldChange(userItem.id, "avatar", event.target.value)
                              }
                              placeholder="URL"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={userItem.is_admin}
                                onCheckedChange={(checked) =>
                                  handleUserFieldChange(userItem.id, "is_admin", checked)
                                }
                              />
                              <span className="text-sm opacity-70">
                                {userItem.is_admin ? "Да" : "Нет"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              onClick={() => void handleSaveUser(userItem)}
                              disabled={Boolean(userSaving[userItem.id])}
                            >
                              {userSaving[userItem.id] ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Save className="mr-2 h-4 w-4" />
                              )}
                              Сохранить
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {!usersList.length && (
                    <p className="py-6 text-center text-sm text-muted-foreground">
                      Пользователи не найдены
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Card className={`${cardClasses} xl:col-span-1`}>
              <CardHeader>
                <CardTitle>Курсы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {coursesError && (
                  <p className="text-sm text-red-400">{coursesError}</p>
                )}
                {coursesLoading ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    {courses.map((course) => {
                      const isActive = course.id === selectedCourseId;
                      return (
                        <button
                          key={course.id}
                          onClick={() => setSelectedCourseId(course.id)}
                          className={`w-full rounded-lg border px-4 py-3 text-left transition ${
                            isActive
                              ? "border-red-500 bg-red-500/10 text-red-200"
                              : "border-transparent bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15"
                          }`}
                        >
                          <p className="font-semibold">{course.title}</p>
                          <p className="text-xs opacity-70 line-clamp-2">
                            {course.description || "Без описания"}
                          </p>
                        </button>
                      );
                    })}
                    {!courses.length && (
                      <p className="text-sm text-muted-foreground">
                        Курсы пока не созданы.
                      </p>
                    )}
                  </div>
                )}

                <form onSubmit={handleCreateCourse} className="space-y-3 border-t pt-4">
                  <h3 className="text-lg font-semibold">Новый курс</h3>
                  <div className="space-y-2">
                    <Label htmlFor="new-course-title">Название</Label>
                    <Input
                      id="new-course-title"
                      value={newCourseForm.title}
                      onChange={(event) =>
                        setNewCourseForm((prev) => ({ ...prev, title: event.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-course-description">Описание</Label>
                    <Textarea
                      id="new-course-description"
                      value={newCourseForm.description}
                      onChange={(event) =>
                        setNewCourseForm((prev) => ({ ...prev, description: event.target.value }))
                      }
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-course-thumbnail">Обложка (URL)</Label>
                    <Input
                      id="new-course-thumbnail"
                      value={newCourseForm.thumbnail}
                      onChange={(event) =>
                        setNewCourseForm((prev) => ({ ...prev, thumbnail: event.target.value }))
                      }
                    />
                  </div>
                  <Button type="submit" disabled={creatingCourse} className="w-full">
                    {creatingCourse ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Plus className="mr-2 h-4 w-4" />
                    )}
                    Создать курс
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className={`${cardClasses} xl:col-span-2`}>
              <CardHeader>
                <CardTitle>Настройка курса</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {courseLoading && (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                )}

                {!courseLoading && !selectedCourse && (
                  <p className="text-sm text-muted-foreground">
                    Выберите курс, чтобы увидеть детали или добавьте новый.
                  </p>
                )}

                {selectedCourse && !courseLoading && (
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="course-title">Название курса</Label>
                        <Input
                          id="course-title"
                          value={selectedCourse.title}
                          onChange={(event) =>
                            handleCourseFieldChange("title", event.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="course-progress">Прогресс, %</Label>
                        <Input
                          id="course-progress"
                          type="number"
                          min={0}
                          max={100}
                          value={selectedCourse.progress}
                          onChange={(event) =>
                            handleCourseFieldChange("progress", Number(event.target.value))
                          }
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="course-description">Описание</Label>
                        <Textarea
                          id="course-description"
                          value={selectedCourse.description}
                          onChange={(event) =>
                            handleCourseFieldChange("description", event.target.value)
                          }
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="course-thumbnail">Обложка (URL)</Label>
                        <Input
                          id="course-thumbnail"
                          value={selectedCourse.thumbnail ?? ""}
                          onChange={(event) =>
                            handleCourseFieldChange("thumbnail", event.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button onClick={() => void handleUpdateCourse()} disabled={updatingCourse}>
                        {updatingCourse ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="mr-2 h-4 w-4" />
                        )}
                        Сохранить курс
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => void handleDeleteCourse()}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Удалить курс
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Уроки курса</h3>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-16">#</TableHead>
                              <TableHead>Название</TableHead>
                              <TableHead>Ссылка на видео</TableHead>
                              <TableHead className="w-32 text-right">Действия</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedCourse.lessons.map((lesson) => (
                              <TableRow key={lesson.id}>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min={0}
                                    value={lesson.order}
                                    onChange={(event) =>
                                      handleLessonFieldChange(
                                        lesson.id,
                                        "order",
                                        event.target.value,
                                      )
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={lesson.title}
                                    onChange={(event) =>
                                      handleLessonFieldChange(
                                        lesson.id,
                                        "title",
                                        event.target.value,
                                      )
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={lesson.video_url}
                                    onChange={(event) =>
                                      handleLessonFieldChange(
                                        lesson.id,
                                        "video_url",
                                        event.target.value,
                                      )
                                    }
                                  />
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() => void handleSaveLesson(lesson)}
                                      disabled={Boolean(lessonSaving[lesson.id])}
                                    >
                                      {lessonSaving[lesson.id] ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      ) : (
                                        <Save className="mr-2 h-4 w-4" />
                                      )}
                                      Сохранить
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => void handleDeleteLesson(lesson.id)}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Удалить
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        {!selectedCourse.lessons.length && (
                          <p className="py-6 text-center text-sm text-muted-foreground">
                            Уроки отсутствуют
                          </p>
                        )}
                      </div>

                      <form onSubmit={handleAddLesson} className="space-y-3 rounded-lg border p-4">
                        <h4 className="text-lg font-semibold">Добавить урок</h4>
                        <div className="grid gap-3 md:grid-cols-2">
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="lesson-title">Название</Label>
                            <Input
                              id="lesson-title"
                              value={lessonForm.title}
                              onChange={(event) =>
                                setLessonForm((prev) => ({ ...prev, title: event.target.value }))
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="lesson-video">Ссылка на видео</Label>
                            <Input
                              id="lesson-video"
                              value={lessonForm.video_url}
                              onChange={(event) =>
                                setLessonForm((prev) => ({
                                  ...prev,
                                  video_url: event.target.value,
                                }))
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2 md:col-span-1">
                            <Label htmlFor="lesson-order">Порядок (опционально)</Label>
                            <Input
                              id="lesson-order"
                              type="number"
                              min={1}
                              value={lessonForm.order}
                              onChange={(event) =>
                                setLessonForm((prev) => ({
                                  ...prev,
                                  order: event.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                        <Button type="submit" className="w-full md:w-auto">
                          <Plus className="mr-2 h-4 w-4" /> Добавить урок
                        </Button>
                      </form>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
