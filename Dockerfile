# 1. Imagen base: Python 3.11 ligera
FROM python:3.11-slim

# 2. Variables de entorno para optimizar Python en Docker
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 3. Directorio de trabajo dentro del contenedor
WORKDIR /code

# 4. Instalación de dependencias
# Copiamos solo el requirements.txt primero para aprovechar la caché de Docker
COPY requirements.txt /code/
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 5. Copiar el código fuente
# Copiamos la carpeta 'app' entera. 
# Importante: Como moviste tu código a una carpeta 'app', copiamos de ./app a /code/app
COPY ./app /code/app

# 6. Exponer el puerto
EXPOSE 8000

# 7. Comando de arranque
# Fíjate en la ruta: app.main:app (Carpeta app -> archivo main.py -> objeto app)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]