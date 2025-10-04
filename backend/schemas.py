from datetime import datetime
from pydantic import BaseModel

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

# TODO: добавить схемы для Course, когда будем хранить в БД


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
