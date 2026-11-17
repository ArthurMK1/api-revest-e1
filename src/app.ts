import express from "express";
import type { Request, Response } from "express";
import Roupa from "./models/Roupa.js"
import roupaRouter from "./routes/roupaRoutes.js"


const app = express();

//MIDDLEWARE
app.use(express.json());
// app.use("json spaces", 2);

//ROTA BASE - GET GERAL
app.get("/roupas", (req: Request, res: Response) =>{
    res.status(200).send("REVEST");
});


// GET - BUSCAR ROUPA PELO ID
// app.get("/roupas/:id", (req: Request, res: Response) => {
//     const id = Number(req.params.id);

//     const roupa = roupas.find(roupa => roupa.id === id);

//     if (!roupa) {
//         return res.status(404).json({
//             mensagem: "Roupa não encontrada"
//         });
//     }

//     res.json(roupa)
// })

//REGISTRAR AS ROTAS DE 'ROUPAS' NA APLICAÇÃO

app.use(roupaRouter);

export default app;
