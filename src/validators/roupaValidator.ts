import { z } from "zod";

//CRIAR AS REGRAS PARA CADASTRO (POST) E PARA ATUALIZAÇÃO (PUT)
export const criarRoupaValidator = z.object ({
    nome: z.string().min(3, "O nome deve ter pelo menos 4 caracteres."),
    tamanho: z.string().max(3, "O tamanho da roupa deve ter no máximo 3 caracteres."),
    preco: z.number().min(2, "O preço deve ter pelo menos 2 caracteres").max(4, "O preço deve ter no máximo 4 caracteres.").positive("A roupa não pode ter preço negativo."),
    categoria: z.string(),
    cover: z
        .string()
        .url("A capa deve ser uma URL válida.")
        .optional()
        .or(z.literal(""))
        .transform((val) => (val === "" ? undefined:val))
});

export const atualizarRoupaValidator = criarRoupaValidator.partial();