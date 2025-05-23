FROM python:3.9-slim

# Установка системных зависимостей
RUN apt-get update && apt-get install -y curl gcc python3-dev libpq-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "app.main:app"]