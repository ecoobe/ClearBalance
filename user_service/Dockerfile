FROM python:alpine

WORKDIR /app

# Копируем зависимости первыми для кэширования
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем всю папку app
COPY ./app ./app

# Меняем команду запуска
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]