from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
import random

from ..models import User
from ..schemas import (
    UserCreate,
    UserResponse,
    Token,
    RegistrationStart,
    RegistrationConfirm,
)
from ..database import get_db
from ..utils import get_password_hash, verify_password

router = APIRouter(tags=["Auth"])

# Конфигурация JWT
SECRET_KEY = "your-secure-secret-key-1234"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
CONFIRMATION_CODE_EXPIRE_MINUTES = 15

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


@router.post("/start-registration", response_model=dict)
async def start_registration(data: RegistrationStart, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == data.email).first()

    if existing_user:
        if existing_user.is_verified:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email уже зарегистрирован",
            )
        # Удаляем предыдущую попытку регистрации
        db.delete(existing_user)
        db.commit()

    # Генерация кода подтверждения
    code = str(random.randint(100000, 999999))
    expires = datetime.utcnow() + timedelta(minutes=CONFIRMATION_CODE_EXPIRE_MINUTES)

    new_user = User(
        email=data.email,
        confirmation_code=code,
        confirmation_code_expires=expires,
        is_verified=False,
    )

    db.add(new_user)
    db.commit()

    # TODO: Заменить на реальную отправку email
    print(f"Код подтверждения для {data.email}: {code}")

    return {"message": "Код подтверждения отправлен на email"}


@router.post("/confirm-registration", response_model=UserResponse)
async def confirm_registration(
    data: RegistrationConfirm, db: Session = Depends(get_db)
):
    if data.password != data.password_confirm:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Пароли не совпадают"
        )

    user = (
        db.query(User)
        .filter(
            User.email == data.email,
            User.confirmation_code == data.code,
            User.confirmation_code_expires > datetime.utcnow(),
        )
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Неверный код или срок действия истек",
        )

    user.hashed_password = get_password_hash(data.password)
    user.is_verified = True
    user.confirmation_code = None
    user.confirmation_code_expires = None

    db.commit()

    return user


@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = (
        db.query(User)
        .filter(User.email == form_data.username, User.is_verified == True)
        .first()
    )

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный email или пароль",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
