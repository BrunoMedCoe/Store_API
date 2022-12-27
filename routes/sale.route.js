import express from "express";
import SaleController from "../controllers/sale.controller.js"

const router = express.Router();                    //criando o roteador com a ideia de receber as requisições

router.post("/", SaleController.createSale);
router.get("/", SaleController.getSales);
router.get("/:id", SaleController.getSale);      //o :id significa o nome do parametro que é acessado dentro do (.params) -> localizado no controller
router.delete("/:id", SaleController.deleteSale);
router.put("/", SaleController.updateSale);
//todas as funções esta passando como parametro para o roteador e quem vai se responsabilizar em chamar essa funçao no momento em que eo endpoit for atingido, será o proprio frameork (express)


export default router;