import express from "express";
import type { Request, Response } from "express";
import Roupa from "./models/Roupa.js"
import roupaRouter from "./routes/roupaRoutes.js"
import { swaggerDocument } from "./docs/swagger.js";
import swaggerUi from "swagger-ui-express";


const app = express();

//MIDDLEWARE
app.use(express.json());
app.set("json spaces", 2);


//ROTA DA DOCUMENTAÇÃO
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))


//ROTA BASE - GET GERAL
app.get("/", (req: Request, res: Response) =>{
    res.status(200).send("REVEST");
});

//REGISTRAR AS ROTAS DE 'ROUPAS' NA APLICAÇÃO
app.use(roupaRouter);

export default app;
