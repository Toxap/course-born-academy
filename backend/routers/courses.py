from fastapi import APIRouter

router = APIRouter()

# TODO: вынести в БД, сейчас mock
courses = [
    {"id": 1, "title": "Основы Python", "progress": 70},
    {"id": 2, "title": "Веб-разработка с Django", "progress": 40},
    {"id": 3, "title": "Разработка Telegram-ботов", "progress": 15},
]

@router.get("/")
def get_courses():
    return courses
