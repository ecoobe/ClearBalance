FROM python:3.13-slim

WORKDIR /app

# Установка зависимостей для psycopg2
RUN apt-get update && apt-get install -y \
	gcc \
	python3-dev \
	libpq-dev \
	&& rm -rf /var/lib/apt/lists/*

# Указываем Python искать модули в /app
ENV PYTHONPATH=/app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем папку app внутрь /app
COPY ./app /app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]