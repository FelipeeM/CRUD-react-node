## Installation

Usar o **npm** como gerenciador de pacotes.

### Configurar .ENV server
- O arquivo .env do server está com o nome **.env.sample**, basta editar para **.env**

### Configurar .ENV root
- O arquivo .env do root ( pasta principal do projeto ) está com o nome **.env.sample**, basta editar para **.env**

### Iniciar MYSQL Docker container
```bash
# Out of this directory
cd ..

# Execute Docker Compose
docker-compose up
```

### Rodar Server
```bash
# Go to server directory
cd server

# Install dependencies
npm i

# Generate Prisma Client
npx prisma generate

# Create Table
npx prisma db push

# Populate DB Table
npm run seed

# For dev enviroment
npm start

```

### Swagger
Documentação do backend

Swagger documentação original [aqui](https://swagger.io/docs/specification/2-0/basic-structure/).


* **URL:** localhost:3333/api-docs/
