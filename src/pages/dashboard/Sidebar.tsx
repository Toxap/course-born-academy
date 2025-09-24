import { Button } from "@/components/ui/button";
import { Home, BookOpen, User, LogOut, Edit3, Sun, Moon } from "lucide-react";

export default function Sidebar({ user, theme, setTheme, setIsProfileOpen, setActivePage }) {

    if (!user) {
  return (
    <aside className="w-64 p-6">
      <p>Загрузка...</p>
    </aside>
  );
}

  return (
    <aside className={`${theme === "dark" ? "bg-gray-900 border-red-800" : "bg-gray-100 border-gray-300"} w-64 border-r p-6 flex flex-col gap-6 relative z-10`}>
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user.avatar}
          alt="Аватар пользователя"
          className="w-12 h-12 rounded-full border-2 border-red-600"
        />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm opacity-70">Студент</p>
        </div>
      </div>
      <Button onClick={() => setIsProfileOpen(true)} className="bg-red-700 hover:bg-red-800 flex items-center gap-2 justify-center">
        <Edit3 className="w-4 h-4" /> Изменить профиль
      </Button>

      <h1 className="text-xl font-extrabold text-red-400 mt-6 mb-4">Courseborn</h1>

      <nav className="flex flex-col gap-4">
        <button onClick={() => setActivePage("home")} className="flex items-center gap-2 hover:text-red-400">
          <Home className="w-5 h-5" /> Главная
        </button>
        <button onClick={() => setActivePage("courses")} className="flex items-center gap-2 hover:text-red-400">
          <BookOpen className="w-5 h-5" /> Курсы
        </button>
        <button onClick={() => setActivePage("profile")} className="flex items-center gap-2 hover:text-red-400">
          <User className="w-5 h-5" /> Профиль
        </button>
        <a href="#" className="flex items-center gap-2 hover:text-red-400">
          <LogOut className="w-5 h-5" /> Выйти
        </a>
      </nav>

      <Button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mt-auto flex items-center gap-2 justify-center"
      >
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        {theme === "dark" ? "Светлая тема" : "Тёмная тема"}
      </Button>
    </aside>
  );
}
