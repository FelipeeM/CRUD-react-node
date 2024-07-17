## Installation

Usar o [npm] como gerenciador de pacotes.

### Criar .ENV server
- Adicionar variaveis:
  - DATABASE_URL 
    - exemplo: mysql://user:password@IP:PORT/db_name
    - O prisma utiliza essa URL para se conectar ao banco de dados.
  - SERVER_URL:
    - exemplo: http://localhost:3333/
    - URL mostrada na documentação do swagger

### Iniciar MYSQL Docker container
```bash
# Out of this directory
cd ..

# Execute Docker Compose
docker-compose up
```
### Criar tabelas
```bash
# Go to server directory
cd server

# Generate Prisma Client
npx prisma generate

# Create Table
npx prisma db push

# Populate DB Table
npm run seed
```

### Rodar Server
```bash
# Go to server directory
cd server

# Install dependencies
npm i

# For dev enviroment
npm start

```

### Swagger
Documentação do backend

Swagger documentação original [aqui](https://swagger.io/docs/specification/2-0/basic-structure/).


* **URL:** localhost:3333/api-docs/
