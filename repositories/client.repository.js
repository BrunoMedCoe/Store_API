//implementar a conexão com o banco de dados
//Banco de Dados SQL com ORM
//realizar pelo Sequelize -> Obtem o mesmo resultado da maneira descrita anteriormente realizando "por debaixo dos panos", com isso a expressão fica bem mais clean e simples.
import Client from "../models/client.model.js";

async function insertClient(client) {
    try {
        return await Client.create(client);
    } catch (err) {
        throw err;
    }
}

async function getClients() {
    try {
        return await Client.findAll();                  //o findAll é uma função embutida que retorna tudo.
    } catch (err) {
        throw err;
    }
}

async function getClient(id) {
    try {
        return await Client.findByPk(id);               //essa função ele busca o Primery Key (Pk), que já esta definida no (client Model).
    } catch {
        throw err;
    }
}

async function deleteClient(id) {
    try {
        await Client.destroy({                      //função que deleta, porém precisa especificar..no caso, o (id).
            where: {
                clientId: id
            }
        });
    } catch (err) {
        throw err;
    }
}

async function updateClient(client) {
    try {
        await Client.update(client, {               //função que atualiza, precisa passar o (where) para que o sequelize entenda corretamente.
            where: {
                clientId: client.clientId
            }
        });
        return await getClient(client.clientId)
    } catch (err) {
        throw err;
    }
}

export default {
    insertClient,
    getClients,
    getClient,
    updateClient,
    deleteClient
}

//----------------------------------------------------------------------
//Banco de Dados SQL Nattivo
/*import { connect } from "./db.js";

async function insertClient(client) {
    const conn = await connect();               //entra no processo em db e retorna a conexao
    try {
        const sql = "INSERT INTO clients (name, cpf, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *"    //Para evitar SQL Injection, evita concatenar parâmtros diretamente no comando SQL utilizando concatenação de strings, e sim passar os parametros como uma array para a funçao
    const values = [client.name, client.cpf, client.phone, client.email, client.address];
    const res = await conn.query(sql, values);
    return res.rows[0];                                //rows -> é uma propriedade que utilizamos para acessar os registros obtidos a partir de uma consulta no banco de dados, que são retornados em um objeto.
    } catch (err) {
        throw err;
    } finally {                                     //sempre será executado, portanto passará pelo finally e cair no release para poder ser fechado a conexão
        conn.release();                             //garantia de fechar(liberar) a conexão. Release é a funçao utilizada para avisar o pool de conexões que aquela conexao não será mais utilizada.
    }
}

async function getClients() {                   //buscar clients -> agora que já esta todo configurado, iremos fazer ao contrario
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM clients");      //a consulta retorna todos os clientes
        return res.rows;                                            //o retorno rows retorna toda a lista
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function getClient(id) {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM clients WHERE client_id = $1", [id]);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function deleteClient(id) {
    const conn = await connect();
    try {
        await conn.query("DELETE FROM clients WHERE client_id = $1", [id]);
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function updateClient(client) {
    const conn = await connect();
    try {
        const sql = 
            "UPDATE clients " +
            "   SET name = $1, cpf = $2, phone = $3, email = $4, address = $5 " +
            " WHERE client_id = $6 RETURNING *";
        const values = [client.name, client.cpf, client.phone, client.email, client.address, client.client_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

export default {
    insertClient,
    getClients,
    getClient,
    updateClient,
    deleteClient
} */