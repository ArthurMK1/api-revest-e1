# Sprint 1 — Estrutura Inicial da API de Roupas

## Objetivo

Criar a estrutura inicial de uma API utilizando Node.js e Express, configurar e executar o servidor e disponibilizar as primeiras rotas para consulta de roupas.

## Tecnologias utilizadas

- Node.js
- Express
- JavaScript
- JSON

## Funcionalidades implementadas

- Criação e configuração do projeto Node.js.
- Instalação do Express.
- Criação e execução do servidor.
- Implementação da rota `GET /`.
- Implementação da rota `GET /roupas`.
- Testes das rotas utilizando Postman ou Thunder Client.

## Rotas da API

### 1. Página inicial

**Método:** GET  
**Endpoint:** `/`

Retorna uma mensagem indicando que a API está funcionando.

**Exemplo de resposta:**

```json
{
  "mensagem": "API de Roupas funcionando!"
}
```

### 2. Listar roupas

**Método:** GET  
**Endpoint:** `/roupas`

Retorna uma lista de roupas em formato JSON.

**Exemplo de resposta:**

```json
[
  {
    "id": 1,
    "nome": "Camiseta",
    "tamanho": "M",
    "cor": "Preta",
    "preco": 49.90
  },
  {
    "id": 2,
    "nome": "Calça jeans",
    "tamanho": "G",
    "cor": "Azul",
    "preco": 119.90
  }
]
```

Os dados podem ser armazenados inicialmente em um array no próprio código, sem a utilização de um banco de dados.

## Como executar o projeto

### Pré-requisitos

É necessário ter o Node.js instalado no computador.

### 1. Instalar as dependências

Abra o terminal na pasta do projeto e execute:

```bash
npm install
```

### 2. Iniciar o servidor

Execute:

```bash
npm start
```

### 3. Acessar a API

Com o servidor em execução, acesse:

- Página inicial: `http://localhost:3000/`
- Lista de roupas: `http://localhost:3000/roupas`

As rotas também podem ser testadas no Postman ou no Thunder Client.

## Critérios de conclusão

- [ ] O projeto Node.js foi criado e configurado.
- [ ] O Express foi instalado corretamente.
- [ ] O servidor inicia sem erros.
- [ ] A rota `GET /` responde corretamente.
- [ ] A rota `GET /roupas` retorna uma lista em JSON.
- [ ] As duas rotas foram testadas.
- [ ] O funcionamento básico do código pode ser explicado.

## Observação

Nesta primeira sprint, os dados são mantidos em memória. Portanto, ainda não existe persistência em banco de dados. A integração com o MongoDB e o Mongoose poderá ser realizada em uma etapa posterior do projeto.


# Sprint 2 — API de Roupas

Implementação da Sprint 2 com dados armazenados em memória (sem MongoDB).

## Como executar

1. Instale o Node.js.
2. Abra o terminal nesta pasta.
3. Execute `npm install`.
4. Execute `npm start`.
5. A API estará disponível em `http://localhost:3000`.

## Rotas

| Método | Endpoint | Função |
|---|---|---|
| GET | `/` | Exibe mensagem e rotas disponíveis |
| GET | `/roupas` | Lista todas as roupas |
| GET | `/roupas/:id` | Consulta uma roupa pelo ID |
| POST | `/roupas` | Cadastra uma roupa |
| PUT | `/roupas/:id` | Substitui todos os campos de uma roupa |
| PATCH | `/roupas/:id` | Atualiza somente os campos enviados |
| DELETE | `/roupas/:id` | Exclui uma roupa |

## Exemplo de cadastro (POST /roupas)

Envie o corpo como JSON:

```json
{
  "nome": "Camiseta",
  "tamanho": "M",
  "cor": "Preta",
  "preco": 49.9
}
```

No Postman ou Thunder Client, selecione `Body` → `JSON`.

## Códigos de status utilizados

- `200 OK`: consulta ou atualização realizada.
- `201 Created`: roupa cadastrada.
- `204 No Content`: roupa excluída com sucesso.
- `400 Bad Request`: dados inválidos ou ID incorreto.
- `404 Not Found`: roupa não encontrada.

## Observação

Como os dados ficam em um array na memória, eles são apagados quando o servidor é reiniciado. A integração com MongoDB fica para uma sprint posterior.

