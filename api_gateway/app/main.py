from flask import Flask
from fastapi import APIRouter

app = Flask(__name__)
router = APIRouter()


@app.route("/gateway")
def gateway():
    return "API Gateway Works!"


@router.get("/health")
async def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
