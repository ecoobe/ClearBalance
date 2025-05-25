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
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")

        if not email:
            raise credentials_exception

        user = db.query(User).filter(User.email == email).first()

        if not user:
            raise credentials_exception

        # Преобразуем дату в ISO формат
        created_at_iso = user.created_at.isoformat() if user.created_at else None

        return UserResponse(
            email=user.email, is_verified=user.is_verified, created_at=created_at_iso
        )

    except JWTError:
        raise credentials_exception
