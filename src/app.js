import express from "express";

const app = express();
app.use(express.json());

const roupas = [
    {
        "id": 1,
        "nome": "Camiseta básica",
        "categoria": "camiseta",
        "cor": "preto",
        "tamanho": "M",
        "preco": 49.90
    },
    {
        "id": 2,
        "nome": "Calça jeans",
        "categoria": "calca",
        "cor": "azul",
        "tamanho": "42",
        "preco": 129.90
    },
    {
        "id": 3,
        "nome": "Moletom com capuz",
        "categoria": "moletom",
        "cor": "cinza",
        "tamanho": "G",
        "preco": 159.90
    },
    {
        "id": 4,
        "nome": "Vestido casual",
        "categoria": "vestido",
        "cor": "vermelho",
        "tamanho": "P",
        "preco": 119.90
    },
    {
        "id": 5,
        "nome": "Jaqueta de couro",
        "categoria": "jaqueta",
        "cor": "preto",
        "tamanho": "M",
        "preco": 249.90
    }
]

//ROTA INICIAL
app.get('/', (req, res) => {
res.type('html').send('<h1>REVEST</h1>');
});

//GET - LISTAR TODAS AS ROUPAS
app.get('/roupas', (req, res) => {
    res.status(200).json(roupas);
});


//CONSULTAR ROUPA PELO ID
app.get("/roupas/:id", (req, res) => {
    const id = Number(req.params.id);
    
    const roupa = roupas.find(roupas => roupas.id === id)

    if(!roupa) {
        return res.status(404).json({ mensagem: "Roupa não encontrada"})
    }
    res.json(roupa);
})



// POST - CADASTRAR UMA ROUPA
app.post("/roupas", (req, res) =>{
    const novaRoupa = {
        id: roupas.length + 1,
        nome: req.body.nome,
        categoria: req.body.categoria,
        cor: req.body.cor,
        tamanho: req.body.tamanho,
        preco: req.body.preco
    }
    roupas.push(novaRoupa);
    res.status(201).json(novaRoupa);
});

// PUT - ATUALIZAR TODOS OS DADOS DE UMA ROUPA
app.put("/roupas/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = roupas.findIndex(roupa => roupa.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensagem: "Roupa não encontrada" });
    }

    roupas[indice] = {
        id: id,
        nome: req.body.nome,
        categoria: req.body.categoria,
        cor: req.body.cor,
        tamanho: req.body.tamanho,
        preco: req.body.preco
    };

    res.json(roupas[indice]);
});

// PATCH - ATUALIZAR ALGUNS DADOS DE UMA ROUPA
app.patch("/roupas/:id", (req, res) => {
    const id = Number(req.params.id);

    const roupa = roupas.find(roupa => roupa.id === id);

    if (!roupa) {
        return res.status(404).json({ mensagem: "Roupa não encontrada" });
    }

    Object.assign(roupa, req.body);

    res.json(roupa);
});

// DELETE - DELETAR UMA ROUPA
app.delete("/roupas/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = roupas.findIndex(roupa => roupa.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensagem: "Roupa não encontrada" });
    }

    roupas.splice(indice, 1);

    res.status(204).end();
});


export default app