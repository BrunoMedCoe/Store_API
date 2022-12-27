import express from "express";
import ClientController from "../controllers/client.controller.js"

const router = express.Router();                    //criando o roteador com a ideia de receber as requisições

router.post("/", ClientController.createClient);
router.get("/", ClientController.getClients);
router.get("/:id", ClientController.getClient);      //o :id significa o nome do parametro que é acessado dentro do (.params) -> localizado no controller
router.delete("/:id", ClientController.deleteClient);
router.put("/", ClientController.updateClient);
//todas as funções esta passando como parametro para o roteador e quem vai se responsabilizar em chamar essa funçao no momento em que eo endpoit for atingido, será o proprio frameork (express)


export default router;