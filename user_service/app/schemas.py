from pydantic import BaseModel, EmailStr, field_validator


class RegistrationStart(BaseModel):
    email: EmailStr


class RegistrationConfirm(BaseModel):
    email: EmailStr
    code: str
    password: str
    password_confirm: str

    @field_validator("password")
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        if not any(c.isupper() for c in v):
            raise ValueError("Password must contain uppercase letters")
        if not any(c.isdigit() for c in v):
            raise ValueError("Password must contain digits")
        return v


# Добавленные классы
class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    email: EmailStr
    is_verified: bool


class Token(BaseModel):
    access_token: str
    token_type: str
