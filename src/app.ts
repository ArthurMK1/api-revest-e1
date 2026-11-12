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

app.get("/roupas", async (req: Request, res: Response) => {
    try{
        const listaRoupas = Roupa.find({});
        res.status(200).json(listaRoupas);
    }catch (error){
        res.status(500).json({ mensagem: "Erro ao buscar roupa"})
    }

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

//REQUISIÇÃO POST (CADASTRAR NOVA ROUPA)
app.post("/roupas", async (req: Request<{},{},InterfaceRoupa>, res: Response) => {
    
    try{
    const { id, nome, categoria, cor, tamanho, preco} = req.body;

    const novaRoupa = await Roupa.create({
        nome,
        categoria,
        cor,
        tamanho,
        preco: Number(preco)
    });

    res.status(201).json({
        mensagem: "Roupa cadastrada com sucesso!",
        roupa: novaRoupa
    });
    }catch (error){
        res.status(500).json({mensagem: "Erro ao cadastrar livro."})
    }
});

// PUT - ATUALIZAR TODOS OS DADOS
app.put("/roupas/:id", (req: Request, res: Response) => {

    const index = buscaRoupa(String(req.params.id));

    if (index === -1) {
        res.status(404).json({ mensagem: "Roupa não encontrada"});
        return;
    }

    const { id, nome, categoria, cor, tamanho, preco} = req.body;

    roupas[index] = {
        ...roupas[index]!,
        nome,
        categoria,
        cor,
        tamanho,
        preco: Number(preco)
    };

    res.status(202).json({
        mensagem: "Livro atualizado com sucesso!",
        roupa: roupas[index]
    });
});

// PATCH - ATUALIZAR ALGUNS DADOS
app.patch("/roupas/:id", (req: Request, res: Response) => {
    const index = buscaRoupa(String(req.params.id))

    if (index === -1) {
        return res.status(404).json({
            mensagem: "Roupa não encontrada!"
        });
    }

    const { id, nome, categoria, cor, tamanho, preco} = req.body;

    roupas[index] = {
        ...roupas[index]!,
        ...(nome !== undefined && {nome}),
        ...(categoria !== undefined && {categoria}),
        ...(cor !== undefined && {cor}),
        ...(tamanho !== undefined && {tamanho}),
        ...(preco !== undefined && {preco: Number(preco)})
    };

    res.status(200).json({
        mensagem: "Livro atualizado com sucesso!",
        roupa: roupas[index]
    });

});

// DELETE - DELETAR UMA ROUPA
app.delete("/roupas/:id", (req: Request, res: Response) => {
    const index = buscaRoupa(String(req.params.id))
    
    const id = Number(req.params.id);

    if (index === -1) {
        return res.status(404).json({
            mensagem: "Roupa não encontrada"
        });
    }

    roupas.splice(index, 1);

    res.status(200).json({
        mensagem: "Roupa retirada com sucesso!"
    });
});


export default app;
