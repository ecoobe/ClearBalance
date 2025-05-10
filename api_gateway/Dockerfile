FROM python:3.9-slim

RUN apt-get update && apt-get install -y \
	gcc \
	nginx \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Копируем конфиг Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Запускаем Nginx и приложение
CMD service nginx start && python your_app.py