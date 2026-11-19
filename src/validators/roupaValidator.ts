import { z } from "zod";

//CRIAR AS REGRAS PARA CADASTRO (POST) E PARA ATUALIZAÇÃO (PUT)
export const criarRoupaValidator = z.object ({
    name: z.string().min(4, "O nome deve ter pelo menos 4 caracteres."),
    size: z.string().max(3, "O tamanho da roupa deve ter no máximo 3 caracteres."),
    price: z.number().positive("A roupa não pode ter preço negativo."),
    category: z.string(),
    color: z.string(),
    cover: z
        .string()
        .url("A capa deve ser uma URL válida.")
        .optional()
        .or(z.literal(""))
        .transform((val) => (val === "" ? undefined:val))
});

export const atualizarRoupaValidator = criarRoupaValidator.partial();