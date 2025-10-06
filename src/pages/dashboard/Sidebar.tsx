import type { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import {
  BookOpen,
  CalendarDays,
  Edit3,
  Home,
  LogOut,
  Moon,
  ShieldCheck,
  Sun,
  User,
} from "lucide-react";

import type { DashboardUser } from "./UserDashboard";

interface SidebarProps {
  user: DashboardUser | null;
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  setIsProfileOpen: Dispatch<SetStateAction<boolean>>;
  setActivePage: Dispatch<SetStateAction<string>>;
  onLogout: () => void;
}

const FALLBACK_AVATAR = "https://api.dicebear.com/7.x/initials/svg?seed=User";

export default function Sidebar({
  user,
  theme,
  setTheme,
  setIsProfileOpen,
  setActivePage,
  onLogout,
}: SidebarProps) {
  const isDark = theme === "dark";
  const avatar = user?.avatar?.trim() ? user.avatar : FALLBACK_AVATAR;
  const roleLabel = user?.is_admin ? "Администратор" : "Студент";

  if (!user) {
    return (
      <aside className="w-64 p-6">
        <p>Загрузка...</p>
      </aside>
    );
  }

  return (
    <aside
      className={`${
        isDark ? "bg-gray-900 border-red-800" : "bg-gray-100 border-gray-300"
      } w-64 border-r p-6 flex flex-col gap-6 relative z-10`}
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={avatar}
          alt="Аватар пользователя"
          className="w-12 h-12 rounded-full border-2 border-red-600 object-cover"
        />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm opacity-70">{roleLabel}</p>
        </div>
      </div>
      <Button
        onClick={() => setIsProfileOpen(true)}
        className="bg-red-700 hover:bg-red-800 flex items-center gap-2 justify-center"
      >
        <Edit3 className="w-4 h-4" /> Изменить профиль
      </Button>

      <h1 className="text-xl font-extrabold text-red-400 mt-6 mb-4">Courseborn</h1>

      <nav className="flex flex-col gap-4">
        <button
          onClick={() => setActivePage("home")}
          className="flex items-center gap-2 hover:text-red-400"
        >
          <Home className="w-5 h-5" /> Главная
        </button>
        <button
          onClick={() => setActivePage("courses")}
          className="flex items-center gap-2 hover:text-red-400"
        >
          <BookOpen className="w-5 h-5" /> Курсы
        </button>
        <button
          onClick={() => setActivePage("webinars")}
          className="flex items-center gap-2 hover:text-red-400"
        >
          <CalendarDays className="w-5 h-5" /> Вебинары
        </button>
        <button
          onClick={() => setActivePage("profile")}
          className="flex items-center gap-2 hover:text-red-400"
        >
          <User className="w-5 h-5" /> Профиль
        </button>
        {user.is_admin && (
          <button
            onClick={() => setActivePage("admin")}
            className="flex items-center gap-2 hover:text-red-400"
          >
            <ShieldCheck className="w-5 h-5" /> Админ-панель
          </button>
        )}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 hover:text-red-400"
        >
          <LogOut className="w-5 h-5" /> Выйти
        </button>
      </nav>

      <Button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="mt-auto flex items-center gap-2 justify-center"
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        {isDark ? "Светлая тема" : "Тёмная тема"}
      </Button>
    </aside>
  );
}
