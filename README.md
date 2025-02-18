# ✨ Desafio AVMB Asten

## Descrição
Este projeto é uma aplicação que gerencia acessos temporários a recursos. É dividido em duas partes: um backend desenvolvido em Node.js e TypeScript, utilizando Prisma ORM e um frontend desenvolvido em Vue.js com Quasar 3.

## 📋 Pré-requisitos

Para rodar a aplicação é necessário ter instalado na sua máquina:

Antes de rodar a aplicação, você precisa ter instalado:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Rodando a aplicação

1. Para iniciar o projeto, clone o repositório:

```
git clone https://github.com/victormarques1/desafio-avmb
```
2. Certifique-se de que você está na pasta raiz do projeto, onde está localizado o arquivo docker-compose.yml.
   
```
cd desafio-avmb
```
3. Criar as variáveis de ambiente no arquivo .env

Exemplo:
```
POSTGRES_USER="admin"
POSTGRES_PASSWORD="admin"
POSTGRES_DB="docker-db"

DATABASE_URL="postgresql://admin:admin@db:5432/docker-db?schema=public"
JWT_SECRET=AVMBSECRET@123
```

4. Execute o seguinte comando para construir os containers e inicializar a aplicação:
   
```
docker-compose up --build
```

5. Um "seed" será rodado junto com a aplicação, criando automáticamente um usuário administrador, suas credenciais de login são:
```
email: admin@admin.com
senha: admin123 
```
Com isso será possível logar no sistema como admnistrador e ter a permissão para aceitar ou rejeitar cadastro de novos usuários.

6. A aplicação estará disponível em:
http://localhost:9000/
