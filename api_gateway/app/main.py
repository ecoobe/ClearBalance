from flask import Flask

app = Flask(__name__)


@app.route("/gateway")
def gateway():
    return "API Gateway Works!"


@app.route("/health")
def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
