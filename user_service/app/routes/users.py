from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from ..database import get_db
from ..models import User
from ..schemas import UserResponse
from app.routes.auth import oauth2_scheme, SECRET_KEY, ALGORITHM  # Добавлен импорт

router = APIRouter()


@router.get("/me", response_model=UserResponse)
async def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),  # Теперь oauth2_scheme определен
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        user = db.query(User).filter(User.email == email).first()

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
