import express from "express";
import cors from "cors";
import winston from "winston";
import clientsRouter from "./routes/client.route.js"     //lembrando que como foi exportado em Default, permite colocar qq nome e no caso utilizou o nome padrao colocando o nome da entidade e o router em CamelCase
import productsRouter from "./routes/product.route.js"
import suppliersRouter from "./routes/supplier.route.js"
import salesRouter from "./routes/sale.route.js"

const { combine, timestamp, label, printf } = winston.format;           //destruction para configurar
const myFormat = printf(({ level, message, label, timestamp }) => {     //configuração
    return `${timestamp} [${label}] ${level} ${message}`                //mensagem impressa formatada
});
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: "store_api.log"})
    ],
    format: combine(
        label({ label: "store_api" }),
        timestamp(),
        myFormat
    )
});

const app = express();     //criando a instancia express para poder subir a API
//agora em cima do app realizará a configuração das rotas e etc...
app.use(express.json());     //mais um middleware para que o express possa ficar convertendo as requisições e respostas em formato json
app.use(cors());             //é a restrição que evita que vc consegue acessar seus endpoints vindo de uma pagina web que esteja em outro servidor 
//app.use(winston());          //essa outra biblioteca serve para gravação de logs, ou seja, 
app.use("/client", clientsRouter);     //todas as requisições que chegar no /client será direcionando no clientsRouter-> Relembrando que o (use) está cpnfigurando no middleware
app.use("/product", productsRouter);
app.use("/supplier", suppliersRouter);
app.use("/sale", salesRouter);
app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
    res.status(400).send({ error: err.message });
})
app.listen(3000, () => console.log("API Started!"));     //inicia na porta 3000 o API e o console é para imprimir a mensagem para certificar se esta OK!

