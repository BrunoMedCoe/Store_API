import express from "express";
import ProductController from "../controllers/product.controller.js"

const router = express.Router();                    //criando o roteador com a ideia de receber as requisições

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getProducts);
router.get("/info", ProductController.getProductsInfo);
router.get("/:id", ProductController.getProduct);      //o :id significa o nome do parametro que é acessado dentro do (.params) -> localizado no controller
router.delete("/:id", ProductController.deleteProduct);
router.put("/", ProductController.updateProduct);
router.post("/info", ProductController.createProductInfo);
router.put("/info", ProductController.updateProductInfo);
router.post("/review", ProductController.createReview);
router.delete("/:id/review/:index", ProductController.deleteReview);
router.delete("/info/:id", ProductController.deleteProductInfo);
//todas as funções esta passando como parametro para o roteador e quem vai se responsabilizar em chamar essa funçao no momento em que eo endpoit for atingido, será o proprio frameork (express)


export default router;