FROM python:3.9-slim

WORKDIR /app

ENV PYTHONPATH="/app:${PYTHONPATH}"

# Установка системных зависимостей
RUN apt-get update && apt-get install -y curl gcc python3-dev libpq-dev && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y \
	gcc \
	python3-dev \
	libpq-dev \
	&& rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["sh", "-c", "alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000"]