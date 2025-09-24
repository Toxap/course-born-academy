export default function HomeSection({ user }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">
        Добро пожаловать, {user.name}!
      </h2>
      <p className="opacity-80">Выберите курс, чтобы продолжить обучение.</p>
    </section>
  );
}
