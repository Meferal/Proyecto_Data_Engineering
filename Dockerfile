# /Dockerfile (Backend)

# 1. Usamos Python 3.11 versión Slim (pesa poco)
FROM python:3.11-slim

# 2. Optimizaciones de Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 3. Carpeta de trabajo
WORKDIR /code

# 4. Instalar dependencias (aprovechando caché)
COPY requirements.txt /code/
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 5. Copiar el código
# Copiamos la carpeta app entera dentro del contenedor
COPY ./app /code/app

# 6. Puerto
EXPOSE 8000

# 7. Comando de ejecución (Producción)
# Usamos la ruta "app.main:app"
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]