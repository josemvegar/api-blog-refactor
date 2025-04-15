# Imagen base de Node.js
FROM node:23-slim

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto para Railway
EXPOSE 3001

# Comando para iniciar la app
CMD ["npm", "start"]
