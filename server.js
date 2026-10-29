import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
res.type('html').send('<h1>REVEST</h1>');
});

app.listen(port, () => {
    console.log(`Servidor local rodando na porta:  ${port}`);
});

app.get('/roupas', (req, res) => {
    res.status(200).send('Rota de roupas encontrada ');
});

app.get('/calcados', (req, res) => {
    res.status(200).send('Rota de calçados encontrada ');
});

app.get('/acessorios', (req, res) => {
    res.status(200).send('Rota de acessorios encontrada ');
});