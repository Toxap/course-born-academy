from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    avatar = Column(String, default="")
    hashed_password = Column(String, nullable=False)

# TODO: позже добавить модель Course, если будем хранить курсы в БД
