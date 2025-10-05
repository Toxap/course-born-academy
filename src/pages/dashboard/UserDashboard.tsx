import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import ProfileModal from "./ProfileModal";

export interface DashboardUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
  is_admin: boolean;
  password?: string;
}

export default function UserDashboard() {
  const [theme, setTheme] = useState("dark");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activePage, setActivePage] = useState("courses");
  const [profileTab, setProfileTab] = useState("info");
  const [user, setUser] = useState<DashboardUser | null>(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      return null;
    }
    try {
      return JSON.parse(storedUser) as DashboardUser;
    } catch (error) {
      console.warn("Не удалось прочитать пользователя из localStorage", error);
      return null;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8000/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data: DashboardUser) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  // Загружаем тему
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  // Сохраняем тему
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const themeClasses = useMemo(
    () => (theme === "dark" ? "bg-black text-white" : "bg-white text-black"),
    [theme],
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={`${themeClasses} min-h-screen flex relative overflow-hidden`}
      >
        <Sidebar
          user={user}
          theme={theme}
          setTheme={setTheme}
          setIsProfileOpen={setIsProfileOpen}
          setActivePage={setActivePage}
          onLogout={handleLogout}
        />
        <MainContent
          activePage={activePage}
          theme={theme}
          user={user}
          profileTab={profileTab}
          setProfileTab={setProfileTab}
          setUser={setUser}
        />
        {isProfileOpen && (
          <ProfileModal
            theme={theme}
            user={user}
            setUser={setUser}
            setIsProfileOpen={setIsProfileOpen}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
