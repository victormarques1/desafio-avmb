# Usa uma imagem base do Node.js
FROM node:18-alpine

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta
EXPOSE 3000

# Comando para rodar as migrações e iniciar o backend
CMD sh -c "while ! nc -z db 5432; do sleep 1; done && npx prisma migrate dev && npm run seed && npm start"