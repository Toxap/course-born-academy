from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text, func
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    avatar = Column(String, default="")
    hashed_password = Column(String, nullable=False)

# TODO: позже добавить модель Course, если будем хранить курсы в БД


class ContactRequest(Base):
    __tablename__ = "contact_requests"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    course = Column(String, nullable=False)
    message = Column(Text, default="")
    personal_data_consent = Column(Boolean, nullable=False, default=False)
    terms_consent = Column(Boolean, nullable=False, default=False)
    marketing_consent = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
