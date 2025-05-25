from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
import random
import secrets

from ..models import User
from ..schemas import (
    UserResponse,
    Token,
    RegistrationStart,
    RegistrationCodeConfirm,
    RegistrationSetPassword,
)
from ..database import get_db
from ..utils import get_password_hash, verify_password

router = APIRouter(tags=["Auth"])

SECRET_KEY = "your-secure-secret-key-1234"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
CONFIRMATION_CODE_EXPIRE_MINUTES = 15
TEMP_TOKEN_EXPIRE_MINUTES = 10
CODE_RESEND_INTERVAL = 60  # seconds

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


@router.post("/start-registration", response_model=dict)
async def start_registration(
    request: Request, data: RegistrationStart, db: Session = Depends(get_db)
):
    user_agent = request.headers.get("User-Agent", "Unknown Browser")
    existing_user = db.query(User).filter(User.email == data.email).first()

    if existing_user and existing_user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email уже зарегистрирован",
        )

    if existing_user and existing_user.last_code_sent_at:
        time_since_last = datetime.utcnow() - existing_user.last_code_sent_at
        if time_since_last.total_seconds() < CODE_RESEND_INTERVAL:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Повторная отправка возможна через {int(CODE_RESEND_INTERVAL - time_since_last.total_seconds())} секунд",
            )

    code = str(random.randint(100000, 999999))
    expires = datetime.utcnow() + timedelta(minutes=CONFIRMATION_CODE_EXPIRE_MINUTES)

    if existing_user:
        existing_user.confirmation_code = code
        existing_user.confirmation_code_expires = expires
        existing_user.last_code_sent_at = datetime.utcnow()
    else:
        new_user = User(
            email=data.email,
            confirmation_code=code,
            confirmation_code_expires=expires,
            last_code_sent_at=datetime.utcnow(),
            registration_browser=user_agent,
        )
        db.add(new_user)

    db.commit()

    print(f"Код подтверждения для {data.email}: {code}")
    return {
        "message": "Код подтверждения отправлен",
        "detail": "Проверьте папку спам, если письмо не пришло",
    }


@router.post("/confirm-code", response_model=dict)
async def confirm_code(data: RegistrationCodeConfirm, db: Session = Depends(get_db)):
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

    temp_token = secrets.token_urlsafe(32)
    user.temp_token = temp_token
    user.temp_token_expires = datetime.utcnow() + timedelta(
        minutes=TEMP_TOKEN_EXPIRE_MINUTES
    )
    db.commit()

    return {"temp_token": temp_token}


@router.post("/set-password", response_model=UserResponse)
async def set_password(
    request: Request, data: RegistrationSetPassword, db: Session = Depends(get_db)
):
    # Проверка заголовка Content-Type
    if request.headers.get("Content-Type") != "application/json":
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Требуется Content-Type: application/json",
        )

    if data.password != data.password_confirm:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Пароли не совпадают"
        )

    user = (
        db.query(User)
        .filter(
            User.temp_token == data.temp_token,
            User.temp_token_expires > datetime.utcnow(),
        )
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Недействительный или просроченный токен",
        )

    # Обновление данных пользователя
    user.hashed_password = get_password_hash(data.password)
    user.is_verified = True
    user.confirmation_code = None
    user.confirmation_code_expires = None
    user.temp_token = None
    user.temp_token_expires = None

    db.commit()
    return user


@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = (
        db.query(User)
        .filter(
            User.email == form_data.username,
            User.is_verified == True,
            User.hashed_password.isnot(None),
        )
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

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    }


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
