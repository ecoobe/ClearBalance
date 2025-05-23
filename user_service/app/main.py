from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.routes.auth import router as auth_router

app = FastAPI(title="User Service", version="0.1.0")

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Authorization"],
)

app.include_router(auth_router, prefix="/api/auth")


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/api/users")
def get_users():
    return {"users": ["user1", "user2"]}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
