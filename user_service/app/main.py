from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"service": "User Service"}

@app.get("/users/{user_id}")
def get_user(user_id: int):
    return {"user_id": user_id, "name": "John Doe"}