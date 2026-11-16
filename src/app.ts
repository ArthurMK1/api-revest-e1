import express from "express";
import type { Request, Response } from "express";
import Roupa, { type InterfaceRoupa } from "./models/Roupa.js";
// export interface Roupa {
//     id: number;
//     nome: string;
//     categoria: string;
//     cor: string;
//     tamanho: string;
//     preco: number;
// }

const app = express();

app.use(express.json());

// const roupas: Roupa[] = [
//     {
//         id: 1,
//         nome: "Camiseta básica",
//         categoria: "camiseta",
//         cor: "preto",
//         tamanho: "M",
//         preco: 49.90
//     },
//     {
//         id: 2,
//         nome: "Calça jeans",
//         categoria: "calca",
//         cor: "azul",
//         tamanho: "42",
//         preco: 129.90
//     },
//     {
//         id: 3,
//         nome: "Moletom com capuz",
//         categoria: "moletom",
//         cor: "cinza",
//         tamanho: "G",
//         preco: 159.90
//     },
//     {
//         id: 4,
//         nome: "Vestido casual",
//         categoria: "vestido",
//         cor: "vermelho",
//         tamanho: "P",
//         preco: 119.90
//     },
//     {
//         id: 5,
//         nome: "Jaqueta de couro",
//         categoria: "jaqueta",
//         cor: "preto",
//         tamanho: "M",
//         preco: 249.90
//     }
// ];

// // BUSCAR ROUPA PELO ID
// function buscaRoupa(id: string | number): number {
//     return roupas.findIndex(roupa => {
//         return roupa.id === Number(id);
//     });
// }

//REQUISIÇÕES

app.get("/", (req: Request, res: Response) => {
    res.type("html").send("<h1>REVEST</h1>");
});


// GET - BUSCAR ROUPA PELO ID
app.get("/roupas/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const roupa = roupas.find(roupa => roupa.id === id);

    if (!roupa) {
        return res.status(404).json({
            mensagem: "Roupa não encontrada"
        });
    }

    res.json(roupa);
});

export default app;
