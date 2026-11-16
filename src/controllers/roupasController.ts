import type {Request, Response} from "express";
import Roupa, { type InterfaceRoupa } from "../models/Roupa.js"


class RoupaController{
    
// GET = listar todos as Roupas

    static async listar (req: Request, res: Response){
        try{
            const listaRoupas = Roupa.find({});
            res.status(200).json(listaRoupas);
        }catch (error){
            res.status(500).json({ mensagem: "Erro ao buscar roupa"})
        }
    }

// POST = Cadastrar novas roupas

    static async cadastrar (req: Request<{},{},InterfaceRoupa>, res: Response){
        try{
            const { nome, categoria, cor, tamanho, preco} = req.body;
            
            const novaRoupa = await Roupa.create({
                nome,
                categoria,
                cor,
                tamanho,
                preco: Number(preco)
            });
            
                res.status(201).json({
                mensagem: "Roupa cadastrada com sucesso!",
                roupa: novaRoupa
                });
        }catch (error){
                res.status(500).json({mensagem: "Erro ao cadastrar livro."})
        }
    }
    
    // PUT = Atualizar dados de roupas
    
    static async atualizaTodos (req: Request<{id: string}, {}, InterfaceRoupa>, res: Response){
        try{
            const {id} = req.params;
            
            const { nome, categoria, cor, tamanho, preco } = req.body;
            
            const roupaAtualizada = await Roupa.findByIdAndUpdate(
                id,
                {
                    nome,
                    categoria,
                    cor,
                    tamanho,
                    preco: Number(preco)
                },
                {new: true}
            );
            
            res.status(200).json({
                mensagem: "Livro atualizado com sucesso!",
                roupa: roupaAtualizada
            });
        }catch (error){
            res.status(500).json({ mensagem: "Erro ao atualizar roupa." })
        }
    }

// PATCH = Atualiza alguns dados 
static async atualizaAlguns (req: Request<{id: string}, {}, InterfaceRoupa>, res: Response){
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
    }catch(error){
            res.status(500).json({mensagem: "Erro ao atualizar parcialmente a Roupa!"});
    }
    
}

// DELETE = apaga uma roupa
static async deleta (req: Request<{id: string}>, res: Response){
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