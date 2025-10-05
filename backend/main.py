from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, users, courses, contact_requests
from database import Base, engine, ensure_user_admin_column

# Создание таблиц
Base.metadata.create_all(bind=engine)
ensure_user_admin_column()

app = FastAPI(title="Courseborn API")

# Разрешаем CORS для фронта
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:5173"],  # фронт
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем роутеры
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(courses.router, prefix="/courses", tags=["Courses"])
app.include_router(contact_requests.router, prefix="/contact-requests", tags=["Contact Requests"])

@app.get("/")
def root():
    return {"message": "Courseborn API is running"}
