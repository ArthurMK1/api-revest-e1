# 👕 API Revest (api-revest-e1)

API RESTful desenvolvida em **Node.js** com **TypeScript** para o gerenciamento de vestuário e estoque de roupas, contando com validação rigorosa de dados, persistência em banco de dados e documentação interativa via Swagger.

---

## 🚀 Tecnologias Utilizadas

* **[Node.js](https://nodejs.org/)** & **[TypeScript](https://www.typescriptlang.org/)** — Ambiente de execução e tipagem estática.
* **[Express](https://expressjs.com/)** — Framework web para construção das rotas e middlewares.
* **[Zod](https://zod.dev/)** — Validação de esquemas e middlewares de entrada de dados (`dataValidator` e `roupaValidator`).
* **[MongoDB / Mongoose](https://mongoosejs.com/)** — Modelagem e conexão com banco de dados NoSQL (`dbConnect.ts`).
* **[Swagger / OpenAPI](https://swagger.io/)** — Documentação interativa dos endpoints da API (`swagger.ts`).

---

## 📁 Estrutura do Projeto

```text
api-revest-e1/
├── src/
│   ├── config/
│   │   └── dbConnect.ts         # Configuração de conexão com o banco de dados
│   ├── controllers/
│   │   └── roupasController.ts  # Regras de negócio e manipulação das requisições
│   ├── docs/
│   │   └── swagger.ts           # Especificação OpenAPI / Swagger
│   ├── middlewares/
│   │   └── dataValidator.ts     # Middleware genérico para validação com Zod
│   ├── models/
│   │   └── Roupa.ts             # Schema e Model da entidade Roupa
│   ├── routes/
│   │   └── roupaRoutes.ts       # Definição das rotas e endpoints de roupas
│   ├── validators/
│   │   └── roupaValidator.ts    # Esquemas de validação Zod para roupas
│   └── app.ts                   # Configuração principal do Express e rotas
├── .env.example                 # Modelo de variáveis de ambiente
├── package.json                 # Dependências e scripts do projeto
├── server.ts                    # Ponto de entrada e inicialização do servidor
└── tsconfig.json                # Configurações do compilador TypeScript
```

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
* [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
* Uma instância do **MongoDB** (local ou via MongoDB Atlas)

---

## 🔧 Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone <url-do-seu-repositorio>
   cd api-revest-e1
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Copie o arquivo `.env.example` para um novo arquivo chamado `.env` na raiz do projeto e preencha com suas credenciais:
   ```bash
   cp .env.example .env
   ```
   *(Ajuste variáveis como `PORT` e `DB_CONNECTION_STRING` conforme definido no seu `.env.example`)*.

---

## ▶️ Executando o Projeto

* **Modo de Desenvolvimento:**
  ```bash
  npm run dev
  ```
* **Build e Produção:**
  ```bash
  npm run build
  npm start
  ```

*(Nota: Verifique os nomes exatos dos scripts no seu arquivo `package.json` caso utilize comandos customizados).*

---

## 📚 Documentação da API (Swagger)

Com o servidor em execução, você pode acessar a interface interativa do Swagger para visualizar e testar todos os endpoints disponíveis:

```text
http://localhost:<PORTA>/api-docs
```
*(Substitua `<PORTA>` e o caminho `/api-docs` caso tenha configurado uma rota específica em `src/app.ts` ou `src/docs/swagger.ts`)*.

---

## 🛣️ Principais Endpoints (`/roupas`)

| Método | Endpoint | Descrição | Validação |
| :--- | :--- | :--- | :--- |
| `GET` | `/roupas` | Lista todas as roupas cadastradas | — |
| `GET` | `/roupas/:id` | Busca uma roupa específica pelo ID | — |
| `POST` | `/roupas` | Cadastra uma nova peça de roupa | `Zod Middleware` |
| `PUT` / `PATCH` | `/roupas/:id` | Atualiza os dados de uma roupa existente | `Zod Middleware` |
| `DELETE` | `/roupas/:id` | Remove uma roupa do sistema | — |

---

## 🛡️ Validação de Dados

As requisições de criação e atualização passam pelo middleware `dataValidator.ts` utilizando os esquemas definidos em `roupaValidator.ts`. Caso algum campo obrigatório esteja ausente ou em formato inválido, a API retornará automaticamente um status `400 Bad Request` detalhando os erros encontrados.

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para utilizá-lo e modificá-lo conforme necessário.