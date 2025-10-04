from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from database import SessionLocal
from models import ContactRequest
from schemas import ContactRequestCreate, ContactRequestOut

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("", response_model=ContactRequestOut, status_code=status.HTTP_201_CREATED)
def create_contact_request(payload: ContactRequestCreate, db: Session = Depends(get_db)):
    contact_request = ContactRequest(**payload.dict())

    try:
        db.add(contact_request)
        db.commit()
        db.refresh(contact_request)
    except SQLAlchemyError as exc:
        db.rollback()
        raise HTTPException(status_code=500, detail="Не удалось сохранить заявку") from exc

    return contact_request


@router.get("", response_model=List[ContactRequestOut])
def list_contact_requests(db: Session = Depends(get_db)):
    return db.query(ContactRequest).order_by(ContactRequest.created_at.desc()).all()
