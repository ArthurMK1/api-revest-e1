import mongoose from "mongoose";

async function connectInDatabase(): Promise<typeof mongoose.connection>{
    
    const dbURI = process.env.DB_CONNECTION_STRING;

    if(!dbURI){
        throw new Error(
            "Variável não encontrada no arquivo .env"
        );
    }

    await mongoose.connect(dbURI);
    
    return mongoose.connection;
}

export default connectInDatabase;