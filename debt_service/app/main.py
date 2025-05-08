from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"service": "Debt Service"}

@app.post("/debts")
def create_debt():
    return {"status": "Debt created"}