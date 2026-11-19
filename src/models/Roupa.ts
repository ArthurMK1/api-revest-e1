import mongoose, {Schema, Document,type InferSchemaType} from "mongoose";
import { version } from "node:os";
import { title } from "node:process";

//INTERFACE ALINHADA COM AS PROPRIEDADES USADAS NO APP.TS
// export interface IRoupa extends Document{
//     nome: string;
//     categoria: string;
//     cor: string;
//     tamanho: string;
//     preco: number;
// }

//DEFINIÇÃO DO SCHEMA MAPEANDO OS CAMPOS

const roupaSchema =  new Schema (
    {
        name:{ type: String, required: true },
        category:{ type: String, required: true },
        color:{ type: String, required: true },
        size:{ type: String, required: true },
        price:{ type: Number, required: true },
        cover: { type: String, default: "https://placehold.co/300x450?text=No+Cover"}
    },
    {versionKey: false}

);

// EXTRAÇÃO AUTOMATICA DO TIPO (SUBTITUINDO A CRIAÇÃO MANUAL DA INTERFACE)

export type InterfaceRoupa = InferSchemaType<typeof roupaSchema>;

// CRIAÇÃO DO MODEL (MONGOOSE)
const Roupa = mongoose.model("Roupa", roupaSchema);

// DISPONIBILIZA O MÓDULO PARA SER IMPORTADO EM OUTROS ARQUIVOS
export default Roupa;