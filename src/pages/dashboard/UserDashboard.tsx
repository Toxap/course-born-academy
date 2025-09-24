import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";


export default function UserDashboard() {
  const [theme, setTheme] = useState("dark");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activePage, setActivePage] = useState("courses");
  const [profileTab, setProfileTab] = useState("info");
  const navigate = useNavigate();

  interface User {
  id: number;
  name: string;
  avatar: string;
  password?: string;
}

const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    navigate("/login");
    return;
  }

  fetch(`http://localhost:8000/users/${userId}`)
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(() => navigate("/login"));
}, []);

  // Загружаем тему
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
    else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Сохраняем тему
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={`${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} min-h-screen flex relative overflow-hidden`}
      >
        <Sidebar
          user={user}
          theme={theme}
          setTheme={setTheme}
          setIsProfileOpen={setIsProfileOpen}
          setActivePage={setActivePage}
        />
        <MainContent
          activePage={activePage}
          theme={theme}
          user={user}
          profileTab={profileTab}
          setProfileTab={setProfileTab}
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
