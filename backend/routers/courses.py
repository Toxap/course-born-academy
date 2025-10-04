from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, selectinload

from database import SessionLocal
from models import Course, Lesson
from schemas import CourseDetail, CourseListItem

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def seed_courses(db: Session) -> None:
    """Создаём демо-курсы, если база пуста."""

    if db.query(Course).count():
        return

    demo_courses = [
        {
            "title": "Основы Python",
            "description": "Изучите базовый синтаксис Python и напишите свои первые программы.",
            "progress": 70,
            "thumbnail": "https://images.unsplash.com/photo-1582719478173-2cf4e1e7ed49?auto=format&fit=crop&w=400&q=80",
            "lessons": [
                {
                    "title": "Введение в Python",
                    "video_url": "https://cdn.coverr.co/videos/coverr-mountain-road-2133/1080p.mp4",
                },
                {
                    "title": "Переменные и типы данных",
                    "video_url": "https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-7327/1080p.mp4",
                },
                {
                    "title": "Условия и циклы",
                    "video_url": "https://cdn.coverr.co/videos/coverr-downtown-street-3068/1080p.mp4",
                },
            ],
        },
        {
            "title": "Веб-разработка с Django",
            "description": "Постройте полноценное веб-приложение на Django шаг за шагом.",
            "progress": 40,
            "thumbnail": "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=400&q=80",
            "lessons": [
                {
                    "title": "Знакомство с Django",
                    "video_url": "https://cdn.coverr.co/videos/coverr-coding-on-the-move-6133/1080p.mp4",
                },
                {
                    "title": "Модели и миграции",
                    "video_url": "https://cdn.coverr.co/videos/coverr-working-at-the-office-1920/1080p.mp4",
                },
                {
                    "title": "Создание шаблонов",
                    "video_url": "https://cdn.coverr.co/videos/coverr-man-working-on-his-laptop-at-a-cafe-6103/1080p.mp4",
                },
            ],
        },
        {
            "title": "Разработка Telegram-ботов",
            "description": "Узнайте, как создавать полезных Telegram-ботов на Python.",
            "progress": 15,
            "thumbnail": "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=400&q=80",
            "lessons": [
                {
                    "title": "Регистрация бота и первые шаги",
                    "video_url": "https://cdn.coverr.co/videos/coverr-working-on-a-laptop-4104/1080p.mp4",
                },
                {
                    "title": "Обработка сообщений",
                    "video_url": "https://cdn.coverr.co/videos/coverr-the-future-is-here-5985/1080p.mp4",
                },
                {
                    "title": "Подключение внешних API",
                    "video_url": "https://cdn.coverr.co/videos/coverr-a-man-typing-on-a-laptop-7688/1080p.mp4",
                },
            ],
        },
    ]

    for course_index, course_data in enumerate(demo_courses, start=1):
        lessons_data = course_data.pop("lessons", [])
        course = Course(id=course_index, **course_data)
        for order, lesson_data in enumerate(lessons_data, start=1):
            course.lessons.append(Lesson(order=order, **lesson_data))
        db.add(course)

    db.commit()


@router.get("/", response_model=List[CourseListItem])
def get_courses(db: Session = Depends(get_db)):
    seed_courses(db)
    return db.query(Course).order_by(Course.id).all()


@router.get("/{course_id}", response_model=CourseDetail)
def get_course(course_id: int, db: Session = Depends(get_db)):
    seed_courses(db)
    course = (
        db.query(Course)
        .options(selectinload(Course.lessons))
        .filter(Course.id == course_id)
        .first()
    )
    if course is None:
        raise HTTPException(status_code=404, detail="Курс не найден")
    return course
