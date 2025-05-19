from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import User
from app.schemas import UserCreate, UserResponse
from app.database import get_db
from app.utils import get_password_hash

router = APIRouter(tags=["Auth"])

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = User(email=user.email, hashed_password=hashed_password)
    
    db.add(new_user)
    db.commit()
    return new_user