from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime


class RegistrationStart(BaseModel):
    email: EmailStr


class RegistrationCodeConfirm(BaseModel):
    email: EmailStr
    code: str


class RegistrationSetPassword(BaseModel):
    temp_token: str
    password: str
    password_confirm: str

    @field_validator("password")
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("Пароль должен содержать минимум 8 символов")
        if not any(c.isupper() for c in v):
            raise ValueError("Пароль должен содержать заглавные буквы")
        if not any(c.isdigit() for c in v):
            raise ValueError("Пароль должен содержать цифры")
        return v


class UserResponse(BaseModel):
    email: EmailStr
    is_verified: bool
    created_at: str  # Добавлено поле


class Token(BaseModel):
    access_token: str
    token_type: str
