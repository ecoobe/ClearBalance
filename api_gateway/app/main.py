from flask import Flask
app = Flask(__name__)

@app.route("/gateway")
def gateway():
    return "API Gateway Works!"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)