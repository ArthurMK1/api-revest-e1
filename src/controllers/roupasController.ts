import type {Request, Response} from "express";
import Roupa, { type InterfaceRoupa } from "../models/Roupa.js"
import type { IRoupaRepository, RoupaDTO, FiltroRoupaDTO } from "../repositories/IRoupaRepository.js";



class RoupaController{

    private roupaRepository: IRoupaRepository;

    constructor(roupaRepository: IRoupaRepository){
        this.roupaRepository = roupaRepository;
    }


// GET = listar todos as Roupas

    async listar (req: Request, res: Response){
        try{
            const listaRoupas = await this.roupaRepository.listar();
            res.status(200).json(listaRoupas);
        }catch (error){
            res.status(500).json({ mensagem: "Erro ao buscar roupa"})
        }
    }

// GET - BUSCAR UMA ROUPA ESPECÍFICA PELO ID - REQ PARAMS

    async buscarPorId (req: Request<{ id: string }>, res: Response){
        try{
            const { id } = req.params;
            const roupaEncontrada = await this.roupaRepository.buscarPorId(id);

            if(!roupaEncontrada) {
                res.status(404).json({mensagem: "Roupa não encontrada."});
                return;
            }

            res.status(200).json(roupaEncontrada);
        }catch (error){
            res.status(500).json({mensagem: "Erro ao buscar roupa por ID."})
        }
    }

// GET - FILTRAR ROUPAS POR CRITÉRIOS OPCIONAIS

    async buscarPorFiltro (req: Request<{},{},InterfaceRoupa>, res: Response ) {
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
                filtro.price = Number(preco)
            }


            const roupasFiltradas = this.roupaRepository.buscarPorFiltro(filtro)

            res.status(200).json(roupasFiltradas)

        }catch (error){
            res.status(500).json({mensagem: "Erro ao filtrar roupas."})
        }
    }

// POST = Cadastrar novas roupas

    async cadastrar (req: Request<{},{},InterfaceRoupa>, res: Response){
        try{
            const novaRoupa = await this.roupaRepository.cadastrar(req.body)
            
                res.status(201).json({
                mensagem: "Roupa cadastrada com sucesso!",
                roupa: novaRoupa
                });
        }catch (error){
                res.status(500).json({mensagem: "Erro ao cadastrar roupa."})
        }
    }
    
    // PUT = Atualizar dados de roupas
    
    async atualizaTodos (req: Request<{id: string}, {}, InterfaceRoupa>, res: Response){
        try{
            const {id} = req.params;
            
            const roupaAtualizada = await this.roupaRepository.atualizaTodos(id, req.body)
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
async atualizaParcial (req: Request<{id: string}, {}, InterfaceRoupa>, res: Response){
    try{
            const { id } = req.params;

            const roupaAtualizada = await this.roupaRepository.atualizaParcial(id, req.body)
    
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
async deletar (req: Request<{id: string}>, res: Response){
    try{
        const {id} = req.params;

        const roupaDeletada = await this.roupaRepository.deletar(id)
        
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