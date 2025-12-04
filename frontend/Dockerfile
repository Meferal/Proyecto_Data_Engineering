# /frontend/Dockerfile

# --- ETAPA 1: Construcción (Builder) ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Instalamos dependencias
RUN npm ci 
COPY . .
# Construimos la app de Next.js para producción
RUN npm run build

# --- ETAPA 2: Ejecución (Runner) ---
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copiamos solo los archivos necesarios de la etapa anterior
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
# Copiamos la carpeta .next completa (simplificado para evitar errores de standalone)
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]