from datetime import datetime
from typing import List

from pydantic import BaseModel, Field, HttpUrl

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    avatar: str
    class Config:
        orm_mode = True

class LessonOut(BaseModel):
    id: int
    title: str
    video_url: HttpUrl
    order: int = Field(0, description="Порядок урока в курсе")

    class Config:
        orm_mode = True


class CourseBase(BaseModel):
    id: int
    title: str
    description: str | None = ""
    progress: int = 0
    thumbnail: str | None = None

    class Config:
        orm_mode = True


class CourseListItem(CourseBase):
    pass


class CourseDetail(CourseBase):
    lessons: List[LessonOut]


class ContactRequestBase(BaseModel):
    name: str
    email: str
    phone: str
    course: str
    message: str | None = None
    personal_data_consent: bool
    terms_consent: bool
    marketing_consent: bool = False


class ContactRequestCreate(ContactRequestBase):
    pass


class ContactRequestOut(ContactRequestBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
