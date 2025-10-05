from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from schemas import UserCreate, UserLogin, UserOut
from passlib.hash import argon2

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email уже зарегистрирован")
    hashed_pw = argon2.hash(user.password)
    is_first_user = db.query(User).count() == 0
    new_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_pw,
        is_admin=is_first_user,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=UserOut)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not argon2.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Неверные учетные данные")
    return db_user

# TODO: добавить JWT токены для реальной авторизации
