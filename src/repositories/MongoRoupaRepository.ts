import Roupa from "../models/Roupa.js";
import type { IRoupaRepository, RoupaDTO, FiltroRoupaDTO } from "./IRoupaRepository.js";

export class MongoRoupaRepository implements IRoupaRepository {

    async listar() {
        return await Roupa.find({});
    }

    async buscarPorId(id: string) {
        return await Roupa.findById(id);
    }

    async buscarPorFiltro(filtros: FiltroRoupaDTO){
        const filtro: Record<string, any> = {};

        if(filtros.nome) {
            filtro.name = {$regex: filtros.nome, $options: "i"}
        }

        if(filtros.categoria) filtro.category = filtros.categoria;

        if(filtros.cor) filtro.color = filtros.cor;

        if(filtros.tamanho) filtro.size = filtros.tamanho;

        if(filtros.preco) filtro.price = filtros.preco;

        return await Roupa.find(filtro);
        
    }

    async cadastrar(dados:RoupaDTO){
        return await Roupa.create({
                name: dados.name,
                category: dados.category,
                color: dados.color,
                size: dados.size,
                price: Number(dados.price),
                ...(dados.cover !== undefined ? { cover: dados.cover }: {})
            });
    }

    async atualizar (id: String ){
        return await Roupa.findByIdAndUpdate(
            id,
            {$set: dados},
            {new: true},
        );
    }

    async atualizaParcial(id: string, dados: Partial<RoupaDTO>) {
        return await Roupa.findByIdAndUpdate(
            id,
            {$set: dados},
            {new: true},
        )
    }

    async deletar (id: string){
        const roupaDeletada = await Roupa.findByIdAndDelete(id);
        return Boolean(roupaDeletada)
    }

}