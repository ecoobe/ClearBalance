from fastapi import FastAPI
from app.app.routes.auth import router as auth_router

app = FastAPI(title="User Service", version="0.1.0")

app.include_router(auth_router, prefix="/auth")

@app.get("/health")
def health_check():
    return {"status": "ok"}