from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"service": "Notification Service"}

@app.post("/notify")
def send_notification():
    return {"status": "Notification sent"}