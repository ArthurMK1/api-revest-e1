import { Router } from 'express';

//IMPORTA O CONTROLLER DE LIVROS
import RoupaController from '../controllers/roupasController.js';

//IMPORTA O MIDDLEWARE (VALIDAÇÃO DE DADOS)
import { validarDados } from '../middlewares/dataValidator.js';

//IMPORTA OS SCHEMAS DO ZOD (VALIDADOR)
import { criarRoupaValidator, atualizarRoupaValidator } from '../validators/roupaValidator.js';

//INICIALIZAR O GERENCIADOR DE ROTAS DO EXPRESS
const router = Router();

//CRIAÇÃO DE ROTAS DA ENTIDADE ROUPA

//1° - ROTAS FIXAS E DE BUSCA
router.get("/roupas/", RoupaController.listar);
router.get("/roupas/busca", RoupaController.buscarPorFiltro);

//2° - ROTAS DE BUSCA COM PARÃMETRO DINÂMICO
router.get("/roupas/:id", RoupaController.buscarPorId);

//3° - ROTAS DE ESCRITA E REMOÇÃO (ESTÁTICAS E DINÂMICAS)
router.post("/roupas", validarDados(criarRoupaValidator), RoupaController.cadastrar);
router.put("/roupas/:id", validarDados(criarRoupaValidator), RoupaController.atualizaTodos);
router.patch("/roupas/:id", validarDados(atualizarRoupaValidator), RoupaController.atualizaParcial);
router.delete("/roupas/:id", RoupaController.deletar);

//EXPORTA AS ROTAS CONFIGURADAS PARA SEREM USADAS NO APP.TS
export default router;