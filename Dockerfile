# Stage 1 - Builder (para pruebas e instalación)
FROM node:23-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Ejecuta los tests (si fallan, detiene el build)
RUN npm test

# Stage 2 - Producción (imagen final liviana)
FROM node:23-slim
WORKDIR /app

# Copia solo lo necesario desde el builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app .

# Variables de entorno para producción
ENV NODE_ENV=production

EXPOSE 3001
CMD ["npm", "start"]