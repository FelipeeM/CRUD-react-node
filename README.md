# CRUD-react-node


### API com Node.js
- **Objetivo:** Criar uma API RESTful usando Node.js e Express para realizar operações CRUD (Create, Read, Update, Delete) na entidade "Produtos".
- **Detalhes:**
  - Campos do Produto: `id`, `nome`, `descrição`, `preço`, `data de criação`.
  - Utilização do MySQL para armazenamento de dados.
  - Implementação de validação de dados na criação e atualização de produtos.
  - Tratamento adequado de erros.

### Frontend com React.js
- **Objetivo:** Desenvolver uma aplicação frontend usando React.js que consuma a API criada no Desafio 1.
- **Detalhes:**
  - Funcionalidades: Visualizar a lista de produtos, adicionar um novo produto, atualizar um produto existente e deletar um produto.
  - Utilização de hooks do React para gerenciar o estado da aplicação.
  - Implementação de formulários para adicionar e atualizar produtos.
  - Adição de feedback visual para o usuário (ex: loading spinners, mensagens de sucesso/erro).

### Integração e Deploy
- **Objetivo:** Integrar a aplicação frontend com a API backend e realizar o deploy.
- **Extra:** 
  - CI/CD com git actions [aqui](https://github.com/FelipeeM/CRUD-react-node/actions).
  - Google Cloud Platform 

## Como Configurar e Rodar o Projeto Localmente ...

Instruções Backend [aqui](https://github.com/FelipeeM/CRUD-react-node/blob/main/server/README.md).

Instruções Frontend [aqui](https://github.com/FelipeeM/CRUD-react-node/blob/main/web/README.md).


### Link para Ambiente de Produção: [aqui](https://crud-product-react.web.app/)


### Tecnologias Utilizadas:

- React
- Node
- Docker
- MYSQL

### Serviços Utilizados:

- Firebase Hosting
- Cloud Run ( Google Cloud Platform )
- VPS para o banco MYSQL

### CI/CD:

- Github Actions
