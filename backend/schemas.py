from datetime import datetime
from typing import List

from pydantic import BaseModel, EmailStr, Field, HttpUrl

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    avatar: str
    is_admin: bool

    class Config:
        orm_mode = True


class UserUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    avatar: str | None = None
    is_admin: bool | None = None

class LessonOut(BaseModel):
    id: int
    title: str
    video_url: HttpUrl
    order: int = Field(0, description="Порядок урока в курсе")

    class Config:
        orm_mode = True


class LessonCreate(BaseModel):
    title: str
    video_url: HttpUrl
    order: int | None = Field(
        default=None, description="Необязательный порядковый номер урока"
    )


class LessonUpdate(BaseModel):
    title: str | None = None
    video_url: HttpUrl | None = None
    order: int | None = Field(
        default=None, description="Новый порядковый номер урока"
    )


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


class CourseCreate(BaseModel):
    title: str
    description: str | None = ""
    progress: int = 0
    thumbnail: str | None = None
    lessons: List[LessonCreate] = []


class CourseUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    progress: int | None = None
    thumbnail: str | None = None


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
