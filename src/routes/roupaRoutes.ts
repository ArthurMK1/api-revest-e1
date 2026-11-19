import { Router } from 'express';

//IMPORTA O CONTROLLER DE LIVROS
import RoupaController from '../controllers/roupasController.js';

//INICIALIZAR O GERENCIADOR DE ROTAS DO EXPRESS
const router = Router();

//CRIAÇÃO DE ROTAS DA ENTIDADE ROUPA

router.get("/roupas/", RoupaController.listar);

router.get("/roupas/:id", RoupaController.buscarPorId);

router.get("/roupas/busca", RoupaController.buscarPorFiltro);

router.post("/roupas", RoupaController.cadastrar);

router.put("/roupas/:id", RoupaController.atualizaTodos);

router.patch("/roupas/:id", RoupaController.atualizaAlguns);

router.delete("/roupas/:id", RoupaController.deleta);



export default router;