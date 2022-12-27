import Sale from "../models/sale.model.js";
import Product from "../models/product.model.js";                //importando para relacionar com o getSales na função findall() -> include
import Client from "../models/client.model.js";                  //idem

async function insertSale(sale) {
    try {
        return await Sale.create(sale);
    } catch (err) {
        throw err;
    }
}

async function getSales() {
    try {
        return await Sale.findAll({
            include: [                                  //essa função pertence ao sequelize e serve para incluir os parâmetros que apresentar na busca, por exemplo o objeto do produto inteiro com as infomações
                {
                    model: Product
                },
                {
                    model: Client
                }
            ]
        });
    } catch (err) {
        throw err;
    }
}

async function getSalesByProductId(productId) {
    try {
        return await Sale.findAll(
            {
                where: {
                    productId: productId
                },
                include: [
                    {
                        model: Client
                    }
                ]
            }
        )
    } catch (err) {
        throw err;
    }
}

async function getSale(id) {
    try {
        return await Sale.findByPk(id)
    } catch (err) {
        throw err;
    }
}

async function deleteSale(id) {
    try {
        await Sale.destroy({
            where: {
                saleId: id
            }
        });
    } catch (err) {
        throw err;
    }
}

async function updateSale(sale) {
    try {
        await Sale.update(
            {
                value: sale.value,                          //são funções opcionais
                date: sale.date,
                clientId: sale.clientId
            },
            {
                where: {
                    saleId: sale.saleId
                }
            }
        );
        return await getSale(sale.saleId);
    } catch (err) {
        throw err;
    }
}

export default {
    insertSale,
    getSales,
    getSalesByProductId,
    getSale,
    updateSale,
    deleteSale
}


/*import connect from "./db.js";


async function insertSale(sale) {
    const conn = await connect();               //entra no processo em db e retorna a conexao
    try {
        const sql = "INSERT INTO sales (value, date, client_id, product_id) VALUES ($1, $2, $3, $4) RETURNING *"    //Para evitar SQL Injection, evita concatenar parâmtros diretamente no comando SQL utilizando concatenação de strings, e sim passar os parametros como uma array para a funçao
    const values = [sale.value, sale.date, sale.client_id, sale.product_id];
    const res = await conn.query(sql, values);
    return res.rows[0];                                //rows -> é uma propriedade que utilizamos para acessar os registros obtidos a partir de uma consulta no banco de dados, que são retornados em um objeto.
    } catch (err) {
        throw err;
    } finally {                                     //sempre será executado, portanto passará pelo finally e cair no release para poder ser fechado a conexão
        conn.release();                             //garantia de fechar(liberar) a conexão. Release é a funçao utilizada para avisar o pool de conexões que aquela conexao não será mais utilizada.
    }
}

async function getSales() {                   //buscar sales -> agora que já esta todo configurado, iremos fazer ao contrario
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM sales");      //a consulta retorna todos os salees
        return res.rows;                                            //o retorno rows retorna toda a lista
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function getSalesByProductId(productId) {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM sales WHERE product_id = $1", [productId]);
        return res.rows;
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function getSale(id) {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM sales WHERE sale_id = $1", [id]);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function deleteSale(id) {
    const conn = await connect();
    try {
        await conn.query("DELETE FROM sales WHERE sale_id = $1", [id]);
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function updateSale(sale) {
    const conn = await connect();
    try {
        const sql = 
            "UPDATE sales " +
            "   SET value = $1, date = $2, client_id = $3, product_id = $4 " +
            " WHERE sale_id = $5 RETURNING *";
        const values = [sale.value, sale.date, sale.client_id, sale.product_id, sale.sale_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

export default {
    insertSale,
    getSales,
    getSalesByProductId,
    getSale,
    updateSale,
    deleteSale
}*/