import "dotenv/config";
import { PrismaClient } from "@prisma/client/extension";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.POSTGRES_URL;

const pool = new pg.pool ({ connectionString });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient ({adapter})

export default prisma;