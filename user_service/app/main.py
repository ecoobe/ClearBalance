from fastapi import FastAPI
from routes.auth import router as auth_router

app = FastAPI(title="User Service", version="0.1.0")

app.include_router(auth_router, prefix="/auth")

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/users")  # Добавлен префикс /api
def get_users():
    return {"users": ["user1", "user2"]}

import uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)