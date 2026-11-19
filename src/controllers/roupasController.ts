import type {Request, Response} from "express";
import Roupa, { type InterfaceRoupa } from "../models/Roupa.js"
import { error } from "node:console";


class RoupaController{
    
// GET = listar todos as Roupas

    static async listar (req: Request, res: Response){
        try{
            const listaRoupas = await Roupa.find({});
            res.status(200).json(listaRoupas);
        }catch (error){
            res.status(500).json({ mensagem: "Erro ao buscar roupa"})
        }
    }

// GET - BUSCAR UMA ROUPA ESPECÍFICA PELO ID - REQ PARAMS

    static async buscarPorId (req: Request<{ id: string }>, res: Response){
        try{
            const { id } = req.params;
            const roupaEncontrada = await Roupa.findById(id);

            if(!roupaEncontrada) {
                res.status(404).json({mensagem: "Roupa não encontrada."});
                return;
            }

            res.status(200).json(roupaEncontrada);
        }catch (error){
            res.status(500).json({mensagem: "Erro ao buscar livro por ID."})
        }
    }

// GET - FILTRAR ROUPAS POR CRITÉRIOS OPCIONAIS

    static async buscarPorFiltro (req: Request<{},{},InterfaceRoupa>, res: Response ) {
        try{
            //Extrair os possíveis filtros enviados após o "?" na URL
            const { nome, categoria, cor, tamanho, preco } = req.query;

            //Criar um objeto vazio para receber apenas os filtros preenchidos
            const filtro: Record<string, any> = {};
            
            if(nome){
                //$regex: busca parcial (ex: "Vestido", encontra "Vestido Aurora Escarlate")
                filtro.name = {$regex: String(nome), $options: "i"}
            }

            if(categoria) {
                filtro.category = String(categoria);
            }

            if(cor){
                filtro.color = String(cor)
            }
            
            if(tamanho){
                filtro.size = String(tamanho)
            }

            if(preco){
                filtro.price = String(preco)
            }


            const roupasFiltradas = await Roupa.find(filtro);

            res.status(200).json(roupasFiltradas)

        }catch (error){
            res.status(500).json({mensagem: "Erro ao filtrar roupas."})
        }
    }

// POST = Cadastrar novas roupas

    static async cadastrar (req: Request<{},{},InterfaceRoupa>, res: Response){
        try{
            const { name, category, color, size, price, cover} = req.body;
            
            const novaRoupa = await Roupa.create({
                name,
                category,
                color,
                size,
                price: Number(price),
                cover
            });
            
                res.status(201).json({
                mensagem: "Roupa cadastrada com sucesso!",
                roupa: novaRoupa
                });
        }catch (error){
                res.status(500).json({mensagem: "Erro ao cadastrar roupa."})
        }
    }
    
    // PUT = Atualizar dados de roupas
    
    static async atualizaTodos (req: Request<{id: string}, {}, InterfaceRoupa>, res: Response){
        try{
            const {id} = req.params;
            
            const { name, category, color, size, price, cover } = req.body;
            
            const roupaAtualizada = await Roupa.findByIdAndUpdate(
                id,
                {
                    name,
                    category,
                    color,
                    size,
                    price: Number(price),
                    cover
                },
                {new: true}
            );
            if (!roupaAtualizada) {
                res.status(404).json({
                    mensagem: "Roupa não encontrada!"
                });
                return;
}
            
            res.status(200).json({
                mensagem: "Roupa atualizada com sucesso!",
                roupa: roupaAtualizada
            });
        }catch (error){
            res.status(500).json({ mensagem: "Erro ao atualizar roupa." })
        }
    }

// PATCH = Atualiza alguns dados
static async atualizaParcial (req: Request<{id: string}, {}, InterfaceRoupa>, res: Response){
    try{
            const { id } = req.params;
    
            const roupaAtualizada = await Roupa.findByIdAndUpdate(
                    id,
                    { $set: req.body },
                    { returnDocument: 'after' }
                    
                )
    
            if (!roupaAtualizada){
                res.status(404).json({
                    mensagem: "Roupa não encontrada!"
                });return;
            }

            res.status(200).json({
                mensagem: "Roupa atualizada com sucesso!",
                roupa: roupaAtualizada
            });

    }catch(error){
            res.status(500).json({mensagem: "Erro ao atualizar parcialmente a Roupa!"});
    }
    
}

// DELETE = apaga uma roupa
static async deletar (req: Request<{id: string}>, res: Response){
    try{
        const {id} = req.params;
        
        const roupaDeletada = await Roupa.findByIdAndDelete(id);
        
        if (!roupaDeletada){
            res.status(404).json({
                mensagem: "Roupa não encontrada!"
            });return;
        }

        res.status(200).json({
            mensagem: "Roupa removida com sucesso!"
        });
    }catch(error){
        res.status(500).json({mensagem: "Erro ao atualizar remover Roupa!"});
        
    }
}




};

export default RoupaController;