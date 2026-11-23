export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API de Roupas",
    version: "1.0.0",
    description:
      "Documentação OpenAPI 3.0.0 para gerenciamento de roupas (listagem, busca por filtro ou ID, cadastro, atualização total/parcial e remoção).",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local de desenvolvimento",
    },
  ],
  tags: [
    {
      name: "Roupas",
      description: "Operações relacionadas à entidade Roupa",
    },
  ],
  components: {
    schemas: {
      CriarRoupaInput: {
        type: "object",
        required: ["name", "size", "price", "category", "color"],
        properties: {
          name: {
            type: "string",
            minLength: 4,
            description: "Nome da roupa (mínimo de 4 caracteres)",
            example: "Vestido Aurora Escarlate",
          },
          size: {
            type: "string",
            maxLength: 3,
            description: "Tamanho da roupa (máximo de 3 caracteres)",
            example: "M",
          },
          price: {
            type: "number",
            format: "double",
            exclusiveMinimum: true,
            minimum: 0,
            description: "Preço da roupa (deve ser um número positivo)",
            example: 189.9,
          },
          category: {
            type: "string",
            description: "Categoria da roupa",
            example: "Vestidos",
          },
          color: {
            type: "string",
            description: "Cor da roupa",
            example: "Escarlate",
          },
          cover: {
            type: "string",
            format: "uri",
            nullable: true,
            description:
              "URL opcional da imagem de capa (string vazia é convertida para undefined)",
            example: "https://exemplo.com/imagens/vestido-aurora-escarlate.jpg",
          },
        },
      },
      AtualizarRoupaInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            minLength: 4,
            description: "Nome da roupa (mínimo de 4 caracteres)",
            example: "Camiseta Básica Algodão",
          },
          size: {
            type: "string",
            maxLength: 3,
            description: "Tamanho da roupa (máximo de 3 caracteres)",
            example: "G",
          },
          price: {
            type: "number",
            format: "double",
            exclusiveMinimum: true,
            minimum: 0,
            description: "Preço da roupa (deve ser um número positivo)",
            example: 79.9,
          },
          category: {
            type: "string",
            description: "Categoria da roupa",
            example: "Camisetas",
          },
          color: {
            type: "string",
            description: "Cor da roupa",
            example: "Preto",
          },
          cover: {
            type: "string",
            format: "uri",
            nullable: true,
            description:
              "URL opcional da imagem de capa (string vazia é convertida para undefined)",
            example: "https://exemplo.com/imagens/camiseta-basica-preta.jpg",
          },
        },
      },
      Roupa: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            description: "Identificador único da roupa no banco de dados",
            example: "65f1a2b3c4d5e6f7a8b9c0d1",
          },
          name: {
            type: "string",
            minLength: 4,
            example: "Vestido Aurora Escarlate",
          },
          size: {
            type: "string",
            maxLength: 3,
            example: "M",
          },
          price: {
            type: "number",
            format: "double",
            example: 189.9,
          },
          category: {
            type: "string",
            example: "Vestidos",
          },
          color: {
            type: "string",
            example: "Escarlate",
          },
          cover: {
            type: "string",
            format: "uri",
            example: "https://exemplo.com/imagens/vestido-aurora-escarlate.jpg",
          },
        },
      },
      RoupaOperacaoResponse: {
        type: "object",
        properties: {
          mensagem: {
            type: "string",
            example: "Roupa cadastrada com sucesso!",
          },
          roupa: {
            $ref: "#/components/schemas/Roupa",
          },
        },
      },
      MensagemResponse: {
        type: "object",
        properties: {
          mensagem: {
            type: "string",
            example: "Roupa removida com sucesso!",
          },
        },
      },
      ErroValidacaoResponse: {
        type: "object",
        properties: {
          mensagem: {
            type: "string",
            example: "Erro de validação nos dados enviados.",
          },
          erros: {
            type: "array",
            items: {
              type: "string",
            },
            example: [
              "O nome deve ter pelo menos 4 caracteres.",
              "A roupa não pode ter preço negativo.",
            ],
          },
        },
      },
      ErroNaoEncontradoResponse: {
        type: "object",
        properties: {
          mensagem: {
            type: "string",
            example: "Roupa não encontrada!",
          },
        },
      },
      ErroServidorResponse: {
        type: "object",
        properties: {
          mensagem: {
            type: "string",
            example: "Erro interno do servidor.",
          },
        },
      },
    },
    parameters: {
      RoupaIdParam: {
        name: "id",
        in: "path",
        required: true,
        description: "ID da roupa",
        schema: {
          type: "string",
          example: "65f1a2b3c4d5e6f7a8b9c0d1",
        },
      },
    },
  },
  paths: {
    "/roupas/": {
      get: {
        tags: ["Roupas"],
        summary: "Listar todas as roupas",
        description: "Retorna a lista completa de roupas cadastradas.",
        responses: {
          "200": {
            description: "Lista de roupas retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Roupa",
                  },
                },
                example: [
                  {
                    _id: "65f1a2b3c4d5e6f7a8b9c0d1",
                    name: "Vestido Aurora Escarlate",
                    size: "M",
                    price: 189.9,
                    category: "Vestidos",
                    color: "Escarlate",
                    cover:
                      "https://exemplo.com/imagens/vestido-aurora-escarlate.jpg",
                  },
                  {
                    _id: "65f1a2b3c4d5e6f7a8b9c0d2",
                    name: "Calça Jeans Reta",
                    size: "42",
                    price: 149.9,
                    category: "Calças",
                    color: "Azul",
                  },
                ],
              },
            },
          },
          "400": {
            description: "Requisição inválida",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacaoResponse",
                },
              },
            },
          },
          "404": {
            description: "Recurso não encontrado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroNaoEncontradoResponse",
                },
              },
            },
          },
          "500": {
            description: "Erro ao buscar roupas",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroServidorResponse",
                },
                example: {
                  mensagem: "Erro ao buscar roupa",
                },
              },
            },
          },
        },
      },
    },
    "/roupas/busca": {
      get: {
        tags: ["Roupas"],
        summary: "Buscar roupas por filtro",
        description:
          "Filtra roupas de acordo com critérios opcionais enviados via query string.",
        parameters: [
          {
            name: "nome",
            in: "query",
            required: false,
            description: "Busca parcial (case-insensitive) pelo nome da roupa",
            schema: {
              type: "string",
              example: "Vestido",
            },
          },
          {
            name: "categoria",
            in: "query",
            required: false,
            description: "Filtra pela categoria exata da roupa",
            schema: {
              type: "string",
              example: "Vestidos",
            },
          },
          {
            name: "cor",
            in: "query",
            required: false,
            description: "Filtra pela cor exata da roupa",
            schema: {
              type: "string",
              example: "Escarlate",
            },
          },
          {
            name: "tamanho",
            in: "query",
            required: false,
            description: "Filtra pelo tamanho exato da roupa",
            schema: {
              type: "string",
              example: "M",
            },
          },
          {
            name: "preco",
            in: "query",
            required: false,
            description: "Filtra pelo preço exato da roupa",
            schema: {
              type: "number",
              format: "double",
              example: 189.9,
            },
          },
        ],
        responses: {
          "200": {
            description: "Roupas filtradas retornadas com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Roupa",
                  },
                },
                example: [
                  {
                    _id: "65f1a2b3c4d5e6f7a8b9c0d1",
                    name: "Vestido Aurora Escarlate",
                    size: "M",
                    price: 189.9,
                    category: "Vestidos",
                    color: "Escarlate",
                    cover:
                      "https://exemplo.com/imagens/vestido-aurora-escarlate.jpg",
                  },
                ],
              },
            },
          },
          "400": {
            description: "Parâmetros de filtro inválidos",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacaoResponse",
                },
              },
            },
          },
          "404": {
            description: "Nenhuma roupa encontrada para o filtro informado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroNaoEncontradoResponse",
                },
                example: {
                  mensagem: "Roupa não encontrada.",
                },
              },
            },
          },
          "500": {
            description: "Erro ao filtrar roupas",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroServidorResponse",
                },
                example: {
                  mensagem: "Erro ao filtrar roupas.",
                },
              },
            },
          },
        },
      },
    },
    "/roupas": {
      post: {
        tags: ["Roupas"],
        summary: "Cadastrar nova roupa",
        description:
          "Valida os dados com criarRoupaValidator e cadastra uma nova roupa.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CriarRoupaInput",
              },
              examples: {
                completa: {
                  summary: "Roupa com todos os campos preenchidos",
                  value: {
                    name: "Vestido Aurora Escarlate",
                    size: "M",
                    price: 189.9,
                    category: "Vestidos",
                    color: "Escarlate",
                    cover:
                      "https://exemplo.com/imagens/vestido-aurora-escarlate.jpg",
                  },
                },
                semCapa: {
                  summary: "Roupa sem campo cover opcional",
                  value: {
                    name: "Camiseta Básica",
                    size: "P",
                    price: 59.9,
                    category: "Camisetas",
                    color: "Branco",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Resposta OK alternativa",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RoupaOperacaoResponse",
                },
              },
            },
          },
          "201": {
            description: "Roupa cadastrada com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RoupaOperacaoResponse",
                },
                example: {
                  mensagem: "Roupa cadastrada com sucesso!",
                  roupa: {
                    _id: "65f1a2b3c4d5e6f7a8b9c0d1",
                    name: "Vestido Aurora Escarlate",
                    size: "M",
                    price: 189.9,
                    category: "Vestidos",
                    color: "Escarlate",
                    cover:
                      "https://exemplo.com/imagens/vestido-aurora-escarlate.jpg",
                  },
                },
              },
            },
          },
          "400": {
            description: "Erro de validação nos dados enviados (Zod)",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacaoResponse",
                },
                example: {
                  mensagem: "Erro de validação",
                  erros: [
                    "O nome deve ter pelo menos 4 caracteres.",
                    "A roupa não pode ter preço negativo.",
                  ],
                },
              },
            },
          },
          "404": {
            description: "Recurso não encontrado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroNaoEncontradoResponse",
                },
              },
            },
          },
          "500": {
            description: "Erro ao cadastrar roupa",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroServidorResponse",
                },
                example: {
                  mensagem: "Erro ao cadastrar roupa.",
                },
              },
            },
          },
        },
      },
    },
    "/roupas/{id}": {
      get: {
        tags: ["Roupas"],
        summary: "Buscar roupa por ID",
        description: "Retorna uma roupa específica a partir do seu ID.",
        parameters: [
          {
            $ref: "#/components/parameters/RoupaIdParam",
          },
        ],
        responses: {
          "200": {
            description: "Roupa encontrada com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Roupa",
                },
                example: {
                  _id: "65f1a2b3c4d5e6f7a8b9c0d1",
                  name: "Vestido Aurora Escarlate",
                  size: "M",
                  price: 189.9,
                  category: "Vestidos",
                  color: "Escarlate",
                  cover:
                    "https://exemplo.com/imagens/vestido-aurora-escarlate.jpg",
                },
              },
            },
          },
          "201": {
            description: "Recurso criado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Roupa",
                },
              },
            },
          },
          "400": {
            description: "ID inválido",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacaoResponse",
                },
              },
            },
          },
          "404": {
            description: "Roupa não encontrada",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroNaoEncontradoResponse",
                },
                example: {
                  mensagem: "Roupa não encontrada.",
                },
              },
            },
          },
          "500": {
            description: "Erro ao buscar roupa por ID",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroServidorResponse",
                },
                example: {
                  mensagem: "Erro ao buscar roupa por ID.",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Roupas"],
        summary: "Atualizar todos os dados de uma roupa",
        description:
          "Valida os dados completos com criarRoupaValidator e substitui os dados da roupa pelo ID.",
        parameters: [
          {
            $ref: "#/components/parameters/RoupaIdParam",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CriarRoupaInput",
              },
              example: {
                name: "Jaqueta Jeans Oversized",
                size: "G",
                price: 249.9,
                category: "Jaquetas",
                color: "Azul",
                cover: "https://exemplo.com/imagens/jaqueta-jeans.jpg",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Roupa atualizada com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RoupaOperacaoResponse",
                },
                example: {
                  mensagem: "Roupa atualizada com sucesso!",
                  roupa: {
                    _id: "65f1a2b3c4d5e6f7a8b9c0d1",
                    name: "Jaqueta Jeans Oversized",
                    size: "G",
                    price: 249.9,
                    category: "Jaquetas",
                    color: "Azul",
                    cover: "https://exemplo.com/imagens/jaqueta-jeans.jpg",
                  },
                },
              },
            },
          },
          "201": {
            description: "Recurso criado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RoupaOperacaoResponse",
                },
              },
            },
          },
          "400": {
            description: "Erro de validação nos dados enviados (Zod)",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacaoResponse",
                },
                example: {
                  mensagem: "Erro de validação",
                  erros: [
                    "O tamanho da roupa deve ter no máximo 3 caracteres.",
                    "A capa deve ser uma URL válida.",
                  ],
                },
              },
            },
          },
          "404": {
            description: "Roupa não encontrada",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroNaoEncontradoResponse",
                },
                example: {
                  mensagem: "Roupa não encontrada!",
                },
              },
            },
          },
          "500": {
            description: "Erro ao atualizar roupa",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroServidorResponse",
                },
                example: {
                  mensagem: "Erro ao atualizar roupa.",
                },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Roupas"],
        summary: "Atualizar parcialmente uma roupa",
        description:
          "Valida os campos enviados com atualizarRoupaValidator e atualiza parcialmente a roupa pelo ID.",
        parameters: [
          {
            $ref: "#/components/parameters/RoupaIdParam",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AtualizarRoupaInput",
              },
              examples: {
                precoETamanho: {
                  summary: "Atualizar apenas preço e tamanho",
                  value: {
                    price: 159.9,
                    size: "GG",
                  },
                },
                capa: {
                  summary: "Atualizar apenas a URL da capa",
                  value: {
                    cover: "https://exemplo.com/imagens/nova-capa.jpg",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Roupa atualizada parcialmente com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RoupaOperacaoResponse",
                },
                example: {
                  mensagem: "Roupa atualizada com sucesso!",
                  roupa: {
                    _id: "65f1a2b3c4d5e6f7a8b9c0d1",
                    name: "Vestido Aurora Escarlate",
                    size: "GG",
                    price: 159.9,
                    category: "Vestidos",
                    color: "Escarlate",
                    cover: "https://exemplo.com/imagens/nova-capa.jpg",
                  },
                },
              },
            },
          },
          "201": {
            description: "Recurso criado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RoupaOperacaoResponse",
                },
              },
            },
          },
          "400": {
            description: "Erro de validação nos dados enviados (Zod)",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacaoResponse",
                },
                example: {
                  mensagem: "Erro de validação",
                  erros: ["A roupa não pode ter preço negativo."],
                },
              },
            },
          },
          "404": {
            description: "Roupa não encontrada",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroNaoEncontradoResponse",
                },
                example: {
                  mensagem: "Roupa não encontrada!",
                },
              },
            },
          },
          "500": {
            description: "Erro ao atualizar parcialmente a roupa",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroServidorResponse",
                },
                example: {
                  mensagem: "Erro ao atualizar parcialmente a Roupa!",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Roupas"],
        summary: "Remover uma roupa por ID",
        description: "Remove permanentemente uma roupa a partir do seu ID.",
        parameters: [
          {
            $ref: "#/components/parameters/RoupaIdParam",
          },
        ],
        responses: {
          "200": {
            description: "Roupa removida com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemResponse",
                },
                example: {
                  mensagem: "Roupa removida com sucesso!",
                },
              },
            },
          },
          "201": {
            description: "Recurso criado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemResponse",
                },
              },
            },
          },
          "400": {
            description: "ID inválido",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacaoResponse",
                },
              },
            },
          },
          "404": {
            description: "Roupa não encontrada",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroNaoEncontradoResponse",
                },
                example: {
                  mensagem: "Roupa não encontrada!",
                },
              },
            },
          },
          "500": {
            description: "Erro ao remover roupa",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroServidorResponse",
                },
                example: {
                  mensagem: "Erro ao atualizar remover Roupa!",
                },
              },
            },
          },
        },
      },
    },
  },
} as const;