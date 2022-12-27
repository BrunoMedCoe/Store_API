import ProductService from "../services/product.service.js"

async function createProduct(req, res, next) {     //função de criar um producte novo, onde vai dar um POST no (/product) e enviar para o BD. -> Relembrando, a função do Router é encaminhar a requisição para o Controller e consequentemente o Controller que vai fazer as validações das requisições
    try{
       let product = req.body;        //validação da requisição                //Req -> objeto do request onde pegas as configurações; Res -> objeto da rresposta quando envia ao usuário como HTTP e tbm se quiser retornar a consulta; Next -> quando quer encaminhar para outro endpoint, outro middleware
       if (!product.name || !product.description || !product.value || !product.stock || !product.supplierId) {
            throw new Error("Name, description, value, stock e supplier ID são obrigatórios.")
        }
        product = await ProductService.createProduct(product)
        res.send(product);
        logger.info(`POST /product - ${JSON.stringify(product)}`);
    } catch (err) {
        next(err);
    }
}

async function getProducts(req, res, next) {
    try {
        res.send(await ProductService.getProducts());
        logger.info("GET /product");
} catch (err) {
        next(err);
    }
}

async function getProduct(req, res, next) {
    try {
        res.send(await ProductService.getProduct(req.params.id));
        logger.info("GET /product")
    } catch (err) {
        next(err);
    }
}

async function deleteProduct(req, res, next) {
    try {
        await ProductService.deleteProduct(req.params.id);
        res.end();                                                  //encerrar a requisiçao sem dar retorno por que está deletando
        logger.info("DELETE /product");
    } catch (err) {
        next(err);
    }
}

async function updateProduct(req, res, next) {
    try {
        let product = req.body;
        if (!product.productId || !product.name || !product.description || !product.value || !product.stock || !product.supplierId) {
            throw new Error("Product ID, Name, description, value, stock e supplier ID são obrigatórios!");
        }
        product = await ProductService.updateProduct(product);
        res.send(product);
        logger.info(`PUT /product - ${JSON.stringify(product)}`);
    } catch (err) {
        next(err);
    }
}

async function createProductInfo(req, res, next) {                  //criando a função para utilizar no mongodb
    try {
        let productInfo = req.body;
        if (!productInfo.productId) {
            throw new Error("Product ID é obrigatório.");
        }
        await ProductService.createProductInfo(productInfo);
        res.end();
        logger.info(`POST /product/info - ${JSON.stringify(productInfo)}`);
    } catch (err) {
        next (err);
    }
}

async function updateProductInfo(req, res, next) {                  //idem
    try {
        let productInfo = req.body;
        if (!productInfo.productId) {
            throw new Error("Product ID é obrigatório.");
        }
        await ProductService.updateProductInfo(productInfo);
        res.end();
        logger.info(`PUT /product/info - ${JSON.stringify(productInfo)}`);
    } catch (err) {
        next (err);
    }
}

async function createReview(req, res, next) {                       //função para criar o revieW
    try {
        let params = req.body;
        if (!params.productId || !params.review) {
            throw new Error("Product ID e Review são obrigatórios.")
        }
        await ProductService.createReview(params.review, params.productId);
        logger.info(`POST /product/review`);
        res.end();
    } catch (err) {
        next(err);
    }
}

async function deleteReview(req, res, next) {                       //função para deletar o indice do revieW
    try {
        await ProductService.deleteReview(req.params.id, req.params.index);
        logger.info(`DELETE /product/${req.params.id}/review/${req.params.index}`);
        res.end();
        
    } catch (err) {
        next(err);
    }
}

async function getProductsInfo(req, res, next) {                            //função para buscar todos os registros.
    try {
        res.send(await ProductService.getProductsInfo());
        logger.info("GET /product/info");
} catch (err) {
        next(err);
    }
}

async function deleteProductInfo(req, res, next) {                            //função para deletar um registro.
    try {
        res.send(await ProductService.deleteProductInfo(parseInt(req.params.id)));
        logger.info("DELETE /product/info");
} catch (err) {
        next(err);
    }
}

export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createProductInfo,
    updateProductInfo,
    createReview,
    deleteReview,
    getProductsInfo,
    deleteProductInfo
}