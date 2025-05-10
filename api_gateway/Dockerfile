FROM python:3.9-slim

RUN apt-get update && apt-get install -y \
	gcc \
	nginx \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443

CMD ["sh", "-c", "nginx -g 'daemon off;' & python app/main.py"]