import { prisma } from "../config/dbConnectPostgres.js";
import type { Prisma } from "../generated/prisma/client.js";
import type {
  IRoupaRepository,
  RoupaDTO,
  FiltroRoupaDTO,
} from "./IRoupaRepository.js";

const DEFAULT_COVER = "https://placehold.co/300x450?text=No+Cover";

export class PostgresRoupaRepository implements IRoupaRepository {
  private toDTO(record: {
    id: string;
    name: string;
    category: string;
    size: string;
    color: string;
    price: Prisma.Decimal;
    cover: string;
  }): RoupaDTO {
    return {
      id: record.id,
      name: record.name,
      category: record.category,
      size: record.size,
      color: record.color,
      price: record.price.toNumber(),
      cover: record.cover,
    };
  }

  private isRecordNotFound(error: unknown): boolean {
    return (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2025"
    );
  }

  async listar(): Promise<RoupaDTO[]> {
    const registros = await prisma.roupa.findMany();
    return registros.map((item) => this.toDTO(item));
  }

  async buscarPorId(id: string): Promise<RoupaDTO | null> {
    const registro = await prisma.roupa.findUnique({
      where: { id },
    });

    return registro ? this.toDTO(registro) : null;
  }

  async buscarPorFiltro(filtros: FiltroRoupaDTO): Promise<RoupaDTO[]> {
    const where: Prisma.RoupaWhereInput = {};

    if (filtros.nome) {
      where.name = {
        contains: filtros.nome,
        mode: "insensitive",
      };
    }

    if (filtros.categoria) {
      where.category = filtros.categoria;
    }

    if (filtros.cor) {
      where.color = filtros.cor;
    }

    if (filtros.tamanho) {
      where.size = filtros.tamanho;
    }

    if (filtros.preco !== undefined && filtros.preco !== "") {
      const precoNumerico = Number(filtros.preco);
      if (!Number.isNaN(precoNumerico)) {
        where.price = precoNumerico;
      }
    }

    const registros = await prisma.roupa.findMany({ where });
    return registros.map((item) => this.toDTO(item));
  }

  async cadastrar(dados: RoupaDTO): Promise<RoupaDTO> {
    const criado = await prisma.roupa.create({
      data: {
        name: dados.name,
        category: dados.category,
        size: dados.size,
        color: dados.color,
        price: dados.price,
        cover: dados.cover ?? DEFAULT_COVER,
      },
    });

    return this.toDTO(criado);
  }

  async atualizaTodos(id: string, dados: RoupaDTO): Promise<RoupaDTO | null> {
    try {
      const atualizado = await prisma.roupa.update({
        where: { id },
        data: {
          name: dados.name,
          category: dados.category,
          size: dados.size,
          color: dados.color,
          price: dados.price,
          cover: dados.cover ?? DEFAULT_COVER,
        },
      });

      return this.toDTO(atualizado);
    } catch (error) {
      if (this.isRecordNotFound(error)) {
        return null;
      }
      throw error;
    }
  }

  async atualizaParcial(
    id: string,
    dados: Partial<RoupaDTO>,
  ): Promise<RoupaDTO | null> {
    const data: Prisma.RoupaUpdateInput = {};

    if (dados.name !== undefined) data.name = dados.name;
    if (dados.category !== undefined) data.category = dados.category;
    if (dados.size !== undefined) data.size = dados.size;
    if (dados.color !== undefined) data.color = dados.color;
    if (dados.price !== undefined) data.price = dados.price;
    if (dados.cover !== undefined) data.cover = dados.cover;

    try {
      const atualizado = await prisma.roupa.update({
        where: { id },
        data,
      });

      return this.toDTO(atualizado);
    } catch (error) {
      if (this.isRecordNotFound(error)) {
        return null;
      }
      throw error;
    }
  }

  async deletar(id: string): Promise<boolean> {
    try {
      await prisma.roupa.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      if (this.isRecordNotFound(error)) {
        return false;
      }
      throw error;
    }
  }
}
