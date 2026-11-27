// Importação para processamento do .env
import "dotenv/config";

// motor responsavel por traduzir os comandos JS/TS em consultas SQL
import { PrismaClient } from "@prisma/client/extension";

// Adaptador oficial do prisma para o postgre ( atualizar o driver JS exrterno)
import { PrismaPg } from "@prisma/adapter-pg";

// BIblioteca postgre (node postgre)
import pg from "pg";

// processa a string de conexão com o Postgre que está no arquivo .env
const connectionString = process.env.POSTGRES_URL;

// Pool ("Piscina de conexões")
const pool = new pg.pool ({ connectionString });

// Incorpora o Pool no nosso adaptador 
const adapter = new PrismaPg(pool);

// Intancia o PrismaClient e passa o adaptador como configuração
const prisma = new PrismaClient ({adapter})

export default prisma;