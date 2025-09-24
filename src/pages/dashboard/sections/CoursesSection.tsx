import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {useEffect, useState} from "react";

export default function CoursesSection({ theme }) {
  const [courses, setCourses] = useState([]);

useEffect(() => {
  fetch("http://localhost:8000/courses")
    .then(res => res.json())
    .then(data => setCourses(data));
}, []);


  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Мои курсы</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <AnimatePresence>
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  theme === "dark"
                    ? "0 0 20px rgba(255,0,0,0.4)"
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
                  <h3 className="text-xl font-semibold mb-4">{course.title}</h3>
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                    <div
                      className={`${course.color} h-3 rounded-full`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm opacity-70 mb-4">
                    Прогресс: {course.progress}%
                  </p>
                  <Button className="bg-red-700 hover:bg-red-800 w-full">
                    Продолжить
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
