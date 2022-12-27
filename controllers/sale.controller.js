import SaleService from "../services/sale.service.js"

async function createSale(req, res, next) {     //função de criar um salee novo, onde vai dar um POST no (/sale) e enviar para o BD. -> Relembrando, a função do Router é encaminhar a requisição para o Controller e consequentemente o Controller que vai fazer as validações das requisições
    try{
       let sale = req.body;        //validação da requisição                //Req -> objeto do request onde pegas as configurações; Res -> objeto da rresposta quando envia ao usuário como HTTP e tbm se quiser retornar a consulta; Next -> quando quer encaminhar para outro endpoint, outro middleware
       if (!sale.value || !sale.date || !sale.clientId || !sale.productId) {
            throw new Error("Value, Date, Client ID e Product ID são obrigatórios.")
        }
        sale = await SaleService.createSale(sale)
        res.send(sale);
        logger.info(`POST /sale - ${JSON.stringify(sale)}`);
    } catch (err) {
        next(err);
    }
}

async function getSales(req, res, next) {
    try {
        res.send(await SaleService.getSales(req.query.productId));     //criando query String
        logger.info("GET /sale");
} catch (err) {
        next(err);
    }
}

async function getSale(req, res, next) {
    try {
        res.send(await SaleService.getSale(req.params.id));
        logger.info("GET /sale")
    } catch (err) {
        next(err);
    }
}

async function deleteSale(req, res, next) {
    try {
        await SaleService.deleteSale(req.params.id);
        res.end();                                                  //encerrar a requisiçao sem dar retorno por que está deletando
        logger.info("DELETE /sale");
    } catch (err) {
        next(err);
    }
}

async function updateSale(req, res, next) {
    try {
        let sale = req.body;
        if (!sale.saleId || !sale.value || !sale.date || !sale.clientId || !sale.productId) {
            throw new Error("Sale ID, Value, Date, Client ID e Product ID são obrigatórios!");
        }
        sale = await SaleService.updateSale(sale);
        res.send(sale);
        logger.info(`PUT /sale - ${JSON.stringify(sale)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    createSale,
    getSales,
    getSale,
    deleteSale,
    updateSale
}