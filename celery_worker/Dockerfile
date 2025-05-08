FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt --trusted-host pypi.tuna.tsinghua.edu.cn

COPY ./app ./app

CMD ["celery", "-A", "app.app", "worker", "--loglevel=info"]