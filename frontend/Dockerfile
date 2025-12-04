# Usamos Node.js imagen ligera
FROM node:18-alpine

WORKDIR /app

# Copiar configuración de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código del frontend
COPY . .

# Exponer el puerto de Next.js
EXPOSE 3000

# Arrancar en modo desarrollo (más seguro para demos rápidas)
CMD ["npm", "run", "dev"]