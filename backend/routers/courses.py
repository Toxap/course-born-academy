from typing import List

from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session, selectinload

from database import SessionLocal
from models import Course, Lesson, User
from schemas import (
    CourseCreate,
    CourseDetail,
    CourseListItem,
    CourseUpdate,
    LessonCreate,
    LessonOut,
    LessonUpdate,
)

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def require_admin(
    x_user_id: int = Header(..., alias="X-User-Id"),
    db: Session = Depends(get_db),
):
    admin = db.query(User).filter(User.id == x_user_id).first()
    if not admin or not admin.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Только администраторы могут выполнять это действие",
        )
    return admin


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
    course.lessons.sort(key=lambda lesson: lesson.order)
    return course


def _get_course_with_lessons(db: Session, course_id: int) -> Course:
    course = (
        db.query(Course)
        .options(selectinload(Course.lessons))
        .filter(Course.id == course_id)
        .first()
    )
    if course is None:
        raise HTTPException(status_code=404, detail="Курс не найден")
    course.lessons.sort(key=lambda lesson: lesson.order)
    return course


@router.post("/", response_model=CourseDetail, status_code=status.HTTP_201_CREATED)
def create_course(
    course_in: CourseCreate,
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    course = Course(
        title=course_in.title,
        description=course_in.description or "",
        progress=course_in.progress or 0,
        thumbnail=course_in.thumbnail or "",
    )
    db.add(course)
    db.flush()

    for index, lesson_data in enumerate(course_in.lessons, start=1):
        order = lesson_data.order if lesson_data.order is not None else index
        lesson = Lesson(
            title=lesson_data.title,
            video_url=str(lesson_data.video_url),
            order=order,
        )
        course.lessons.append(lesson)

    db.commit()
    return _get_course_with_lessons(db, course.id)


@router.patch("/{course_id}", response_model=CourseDetail)
def update_course(
    course_id: int,
    payload: CourseUpdate,
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    course = _get_course_with_lessons(db, course_id)
    update_data = payload.dict(exclude_unset=True)

    for field, value in update_data.items():
        setattr(course, field, value)

    db.commit()
    db.refresh(course)
    return _get_course_with_lessons(db, course_id)


@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(
    course_id: int,
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if course is None:
        raise HTTPException(status_code=404, detail="Курс не найден")
    db.delete(course)
    db.commit()


@router.post(
    "/{course_id}/lessons",
    response_model=CourseDetail,
    status_code=status.HTTP_201_CREATED,
)
def create_lesson(
    course_id: int,
    payload: LessonCreate,
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    course = _get_course_with_lessons(db, course_id)
    max_order = max((lesson.order for lesson in course.lessons), default=0)
    order = payload.order if payload.order is not None else max_order + 1
    lesson = Lesson(
        title=payload.title,
        video_url=str(payload.video_url),
        order=order,
    )
    course.lessons.append(lesson)
    db.add(lesson)
    db.commit()
    return _get_course_with_lessons(db, course_id)


@router.patch(
    "/{course_id}/lessons/{lesson_id}",
    response_model=LessonOut,
)
def update_lesson(
    course_id: int,
    lesson_id: int,
    payload: LessonUpdate,
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    lesson = (
        db.query(Lesson)
        .filter(Lesson.id == lesson_id, Lesson.course_id == course_id)
        .first()
    )
    if lesson is None:
        raise HTTPException(status_code=404, detail="Урок не найден")

    update_data = payload.dict(exclude_unset=True)
    for field, value in update_data.items():
        if field == "video_url" and value is not None:
            value = str(value)
        setattr(lesson, field, value)

    db.commit()
    db.refresh(lesson)
    return lesson


@router.delete(
    "/{course_id}/lessons/{lesson_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_lesson(
    course_id: int,
    lesson_id: int,
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    lesson = (
        db.query(Lesson)
        .filter(Lesson.id == lesson_id, Lesson.course_id == course_id)
        .first()
    )
    if lesson is None:
        raise HTTPException(status_code=404, detail="Урок не найден")
    db.delete(lesson)
    db.commit()
