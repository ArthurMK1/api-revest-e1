import type { Request, Response, NextFunction } from "express"
import { z } from "zod"

//CRIAÇÃO DA FUNÇÃO GENÉRICA(FÁBRICA) (TODAS AS ENTIDADES)
export function validarDados(Validador: z.ZodType) {
    
    return (req: Request, res: Response, next: NextFunction) => {

        const resultado = Validador.safeParse(req.body)

        if(!resultado.success){
            const erroFormatado = resultado.error.issues.map((erro) => ({
                campo: erro.path.join("."),
                mensagem: erro.message,
            }));

            res.status(400).json({mensagem: "Erro de validação dos dados.", erros: erroFormatado})
            return
        }

        req.body = resultado.data;

        next();
    };
}