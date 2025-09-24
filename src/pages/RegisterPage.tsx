import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert("Пароли не совпадают!");
    return;
  }
  try {
    const res = await fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) throw new Error("Ошибка регистрации");
    const user = await res.json();

    localStorage.setItem("userId", user.id);

    navigate("/dashboard");
  } catch (err) {
    alert("Ошибка при регистрации");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <Card className="w-full max-w-md bg-slate-800 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-white">
            Регистрация
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-slate-700 text-white"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-slate-700 text-white"
            />
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-slate-700 text-white"
            />
            <Input
              type="password"
              placeholder="Подтвердите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-slate-700 text-white"
            />
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Зарегистрироваться
            </Button>
          </form>

          <div className="mt-6 text-center text-white/80">
            Уже есть аккаунт?{" "}
            <Button
              variant="link"
              className="text-red-500 hover:text-red-400"
              onClick={() => navigate("/login")}
            >
              Войти
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
