from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"service": "Payment Service"}

@app.post("/payments")
def create_payment():
    return {"status": "Payment processed"}