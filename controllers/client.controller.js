import ClientService from "../services/client.service.js"

async function createClient(req, res, next) {     //função de criar um cliente novo, onde vai dar um POST no (/client) e enviar para o BD. -> Relembrando, a função do Router é encaminhar a requisição para o Controller e consequentemente o Controller que vai fazer as validações das requisições
    try{
       let client = req.body;        //validação da requisição                //Req -> objeto do request onde pegas as configurações; Res -> objeto da rresposta quando envia ao usuário como HTTP e tbm se quiser retornar a consulta; Next -> quando quer encaminhar para outro endpoint, outro middleware
       if (!client.name || !client.cpf || !client.phone || !client.email || !client.address) {
            throw new Error("Name, CPF, Phone, Email e Address são obrigatórios.")
        }
        client = await ClientService.createClient(client)
        res.send(client);
        logger.info(`POST /client - ${JSON.stringify(client)}`);
    } catch (err) {
        next(err);
    }
}

async function getClients(req, res, next) {
    try {
        res.send(await ClientService.getClients());
        logger.info("GET /client");
} catch (err) {
        next(err);
    }
}

async function getClient(req, res, next) {
    try {
        res.send(await ClientService.getClient(req.params.id));
        logger.info("GET /client")
    } catch (err) {
        next(err);
    }
}

async function deleteClient(req, res, next) {
    try {
        await ClientService.deleteClient(req.params.id);
        res.end();                                                  //encerrar a requisiçao sem dar retorno por que está deletando
        logger.info("DELETE /client");
    } catch (err) {
        next(err);
    }
}

async function updateClient(req, res, next) {
    try {
        let client = req.body;
        if (!client.clientId || !client.name || !client.cpf || !client.phone || !client.email || !client.address) {
            throw new Error("Client ID, Name, CPF, Phone, Email e Address são obrigatórios!");
        }
        client = await ClientService.updateClient(client);
        res.send(client);
        logger.info(`PUT /client - ${JSON.stringify(client)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    createClient,
    getClients,
    getClient,
    deleteClient,
    updateClient
}