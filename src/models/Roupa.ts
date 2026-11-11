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
    nome:{ type: String, require: true },
    categoria:{ type: String, require: true },
    cor:{ type: String, require: true },
    tamanho:{ type: String, require: true },
    preco:{ type: Number, require: true }
},
{versionKey: false}

)

// EXTRAÇÃO AUTOMATICA DO TIPO (SUBTITUINDO A CRIAÇÃO MANUAL DA INTERFACE)

export type Interfaceroupa = InferSchemaType<typeof roupaSchema>;

// CRIAÇÃO DO MODEL (MONGOOSE)
const Roupa = mongoose.model("Roupas", roupaSchema);

// DISPONIBILIZA O MÓDULO PARA SER IMPORTADO EM OUTROS ARQUIVOS 
export default Roupa;