import express from "express";
import SupplierController from "../controllers/supplier.controller.js"

const router = express.Router();                    //criando o roteador com a ideia de receber as requisições

router.post("/", SupplierController.createSupplier);
router.get("/", SupplierController.getSuppliers);
router.get("/:id", SupplierController.getSupplier);      //o :id significa o nome do parametro que é acessado dentro do (.params) -> localizado no controller
router.delete("/:id", SupplierController.deleteSupplier);
router.put("/", SupplierController.updateSupplier);
//todas as funções esta passando como parametro para o roteador e quem vai se responsabilizar em chamar essa funçao no momento em que eo endpoit for atingido, será o proprio frameork (express)


export default router;