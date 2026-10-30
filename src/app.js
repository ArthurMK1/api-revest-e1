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

app.get('/', (req, res) => {
res.type('html').send('<h1>REVEST</h1>');
});

app.get('/roupas', (req, res) => {
    res.status(200).json(roupas);
});




export default app