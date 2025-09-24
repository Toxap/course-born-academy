import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function ProfileModal({ theme, user, setUser, setIsProfileOpen }) {
  const handleSave = (e) => {
    e.preventDefault();
    setIsProfileOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`${
          theme === "dark" ? "bg-gray-900 border-red-800" : "bg-white border-gray-300"
        } p-8 rounded-2xl w-96 relative`}
      >
        <button
          onClick={() => setIsProfileOpen(false)}
          className="absolute top-4 right-4 opacity-70 hover:opacity-100"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold mb-6 text-red-400">
          Редактировать профиль
        </h2>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Имя"
            className={`${
              theme === "dark"
                ? "bg-gray-800 border-red-700 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            } p-3 rounded-lg`}
          />
          <input
            type="text"
            value={user.avatar}
            onChange={(e) => setUser({ ...user, avatar: e.target.value })}
            placeholder="URL аватарки"
            className={`${
              theme === "dark"
                ? "bg-gray-800 border-red-700 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            } p-3 rounded-lg`}
          />
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Новый пароль"
            className={`${
              theme === "dark"
                ? "bg-gray-800 border-red-700 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            } p-3 rounded-lg`}
          />
          <Button type="submit" className="bg-red-700 hover:bg-red-800 w-full">
            Сохранить
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
