from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=True)
    confirmation_code = Column(String)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    confirmation_code_expires = Column(DateTime)
    temp_token = Column(String)
    temp_token_expires = Column(DateTime)
    last_code_sent_at = Column(DateTime)
    registration_browser = Column(String)  # Новое поле
