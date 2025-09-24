import { AnimatePresence, motion } from "framer-motion";
import { Award, FileText } from "lucide-react";

export default function ProfileSection({ theme, user, profileTab, setProfileTab }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Профиль пользователя</h2>
      <div className="flex items-center gap-6 mb-6">
        <img
          src={user.avatar}
          alt="Аватар пользователя"
          className="w-24 h-24 rounded-full border-4 border-red-600"
        />
        <div>
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="opacity-70">Студент курса</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b border-red-800 pb-2">
        <button
          onClick={() => setProfileTab("info")}
          className={`pb-1 ${
            profileTab === "info"
              ? "text-red-400 border-b-2 border-red-400"
              : "opacity-70 hover:text-red-300"
          }`}
        >
          Информация
        </button>
        <button
          onClick={() => setProfileTab("achievements")}
          className={`pb-1 ${
            profileTab === "achievements"
              ? "text-red-400 border-b-2 border-red-400"
              : "opacity-70 hover:text-red-300"
          }`}
        >
          <Award className="inline w-4 h-4 mr-1" /> Достижения
        </button>
        <button
          onClick={() => setProfileTab("certificates")}
          className={`pb-1 ${
            profileTab === "certificates"
              ? "text-red-400 border-b-2 border-red-400"
              : "opacity-70 hover:text-red-300"
          }`}
        >
          <FileText className="inline w-4 h-4 mr-1" /> Сертификаты
        </button>
      </div>

      <AnimatePresence mode="wait">
        {profileTab === "info" && (
          <motion.div
            key="info"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="opacity-80 mb-4">Email: anton@example.com</p>
            <p className="opacity-80 mb-4">Пройдено курсов: 2</p>
            <p className="opacity-80">
              Активный курс: Веб-разработка с Django
            </p>
          </motion.div>
        )}

        {profileTab === "achievements" && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="list-disc pl-6 opacity-80">
              <li>Завершён курс "Основы Python"</li>
              <li>Достижение: 100 дней кодинга</li>
              <li>Пройдено 70% курса "Django"</li>
            </ul>
          </motion.div>
        )}

        {profileTab === "certificates" && (
          <motion.div
            key="certificates"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="list-disc pl-6 opacity-80">
              <li>Сертификат по Python (2025)</li>
              <li>Сертификат по SQL (2025)</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
