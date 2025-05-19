FROM python:3.9-slim

WORKDIR /app

# Установка PYTHONPATH для корректных импортов
ENV PYTHONPATH="/app:${PYTHONPATH}"

# Установка зависимостей для psycopg2
RUN apt-get update && apt-get install -y \
	gcc \
	python3-dev \
	libpq-dev \
	&& rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app /app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]