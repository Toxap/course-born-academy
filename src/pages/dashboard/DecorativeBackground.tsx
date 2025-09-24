import { motion } from "framer-motion";

export default function DecorativeBackground({ theme }) {
  return (
    <>
      <motion.div
        className={`${
          theme === "dark" ? "bg-red-800/10" : "bg-red-200/20"
        } absolute w-[300px] h-[300px] rounded-full blur-2xl -top-20 -left-20 will-change-transform`}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 180, ease: "linear" }} // медленнее
      />
      <motion.div
        className={`${
          theme === "dark" ? "bg-red-700/10" : "bg-red-300/20"
        } absolute w-[250px] h-[250px] rounded-full blur-xl bottom-0 -right-20 will-change-transform`}
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 200, ease: "linear" }} // медленнее
      />
    </>
  );
}
