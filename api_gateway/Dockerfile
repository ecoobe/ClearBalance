# Используем официальное изображение Python
FROM python:3.9-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем зависимости из файла requirements.txt
RUN pip install --no-cache-dir -r requirements.txt --trusted-host pypi.tuna.tsinghua.edu.cn

# Копируем весь проект (включая код приложения) в контейнер
COPY api_gateway/ . 

# Команда для запуска приложения с использованием Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]