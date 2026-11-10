import mongoose, {Schema, Document} from "mongoose";

//INTERFACE ALINHADA COM AS PROPRIEDADES USADAS NO APP.TS
export interface IRoupa extends Document{
    nome: string;
    categoria: string;
    cor: string;
    tamanho: string;
    preco: number;
}

//DEFINIÇÃO DO SCHEMA MAPEANDO OS CAMPOS