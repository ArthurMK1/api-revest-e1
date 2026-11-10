import "dotenv/config";
import app from './src/app.js';
import connectInDatabase from "./src/config/dbConnect.js";
import mongoose from "mongoose";


const port = process.env.PORT || 3000;

async function InitializeServer(){

    try{
        const connection = await connectInDatabase();

        console.log("Conexão com o MongoDB realizada com sucesso!")

        connection.on("error", (erro) => {
            console.error("Erro ao conectar com o MongoDB:", erro);
        });


    app.listen(port, () => {
        console.log(`Servidor local rodando na porta:  ${port}`);
    });

    } catch (erro) {
        console.error("Falha ao inicializar o servidor ou banco de dados: ", erro)

        process.exit(1);
    }

}

InitializeServer();