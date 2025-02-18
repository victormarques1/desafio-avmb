# Usa uma imagem base do Node.js
FROM node:18-alpine

# Define o diretório de trabalho no container
WORKDIR /app

# Copia apenas os arquivos de dependências para otimizar cache
COPY package.json package-lock.json ./

# Instala o Quasar CLI globalmente
RUN npm install -g @quasar/cli

# Copia o restante do código (incluindo quasar.config.js)
COPY . .

# Instala as dependências do projeto
RUN npm install

# Expõe a porta
EXPOSE 9000

# Comando para rodar o frontend com Quasar
CMD ["quasar", "dev"]