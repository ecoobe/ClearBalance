from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import datetime

from ..database import get_db
from ..models import User
from ..schemas import UserResponse
from .auth import oauth2_scheme, SECRET_KEY, ALGORITHM

router = APIRouter()


@router.get("/me", response_model=UserResponse)
async def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Недействительные учетные данные",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # Декодируем JWT токен
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")

        if not email:
            raise credentials_exception

        # Ищем пользователя в базе данных
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise credentials_exception

        # Преобразование даты в ISO 8601 с явным указанием временной зоны
        created_at_iso = user.created_at.replace(microsecond=0).isoformat() + "Z"

        # Формируем ответ с обязательными полями схемы
        return {
            "email": user.email,
            "is_verified": user.is_verified,
            "created_at": created_at_iso,
        }

    except JWTError as e:
        print(f"JWT Error: {str(e)}")
        raise credentials_exception
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Внутренняя ошибка сервера",
        )
