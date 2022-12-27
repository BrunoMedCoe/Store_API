import SupplierService from "../services/supplier.service.js"

async function createSupplier(req, res, next) {     //função de criar um suppliere novo, onde vai dar um POST no (/supplier) e enviar para o BD. -> Relembrando, a função do Router é encaminhar a requisição para o Controller e consequentemente o Controller que vai fazer as validações das requisições
    try{
       let supplier = req.body;        //validação da requisição                //Req -> objeto do request onde pegas as configurações; Res -> objeto da rresposta quando envia ao usuário como HTTP e tbm se quiser retornar a consulta; Next -> quando quer encaminhar para outro endpoint, outro middleware
       if (!supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.address) {
            throw new Error("Name, CNPJ, Phone, Email e Address são obrigatórios.")
        }
        supplier = await SupplierService.createSupplier(supplier)
        res.send(supplier);
        logger.info(`POST /supplier - ${JSON.stringify(supplier)}`);
    } catch (err) {
        next(err);
    }
}

async function getSuppliers(req, res, next) {
    try {
        res.send(await SupplierService.getSuppliers());
        logger.info("GET /supplier");
} catch (err) {
        next(err);
    }
}

async function getSupplier(req, res, next) {
    try {
        res.send(await SupplierService.getSupplier(req.params.id));
        logger.info("GET /supplier")
    } catch (err) {
        next(err);
    }
}

async function deleteSupplier(req, res, next) {
    try {
        await SupplierService.deleteSupplier(req.params.id);
        res.end();                                                  //encerrar a requisiçao sem dar retorno por que está deletando
        logger.info("DELETE /supplier");
    } catch (err) {
        next(err);
    }
}

async function updateSupplier(req, res, next) {
    try {
        let supplier = req.body;
        if (!supplier.supplierId || !supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.address) {
            throw new Error("Supplier ID, Name, CNPJ, Phone, Email e Address são obrigatórios!");
        }
        supplier = await SupplierService.updateSupplier(supplier);
        res.send(supplier);
        logger.info(`PUT /supplier - ${JSON.stringify(supplier)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    createSupplier,
    getSuppliers,
    getSupplier,
    deleteSupplier,
    updateSupplier
}