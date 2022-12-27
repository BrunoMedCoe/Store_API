//Banco de Dados SQL com ORM
//realizar pelo Sequelize -> Obtem o mesmo resultado da maneira descrita anteriormente realizando "por debaixo dos panos", com isso a expressão fica bem mais clean e simples.
import Supplier from "../models/supplier.model.js";

async function insertSupplier(supplier) {
    try {
        return await Supplier.create(supplier);
    } catch (err) {
        throw err;
    }
}

async function getSuppliers() {
    try {
        return await Supplier.findAll();                  //o findAll é uma função embutida que retorna tudo.
    } catch (err) {
        throw err;
    }
}

async function getSupplier(id) {
    try {
        return await Supplier.findByPk(id);               //essa função ele busca o Primery Key (Pk), que já esta definida no (supplier Model).
    } catch {
        throw err;
    }
}

async function deleteSupplier(id) {
    try {
        await Supplier.destroy({                      //função que deleta, porém precisa especificar..no caso, o (id).
            where: {
                supplierId: id
            }
        });
    } catch (err) {
        throw err;
    }
}

async function updateSupplier(supplier) {
    try {
        await Supplier.update(supplier, {               //função que atualiza, precisa passar o (where) para que o sequelize entenda corretamente.
            where: {
                supplierId: supplier.supplierId
            }
        });
        return await getSupplier(supplier.supplierId)
    } catch (err) {
        throw err;
    }
}

export default {
    insertSupplier,
    getSuppliers,
    getSupplier,
    updateSupplier,
    deleteSupplier
}


//-----------------------------------------------------------

//Banco de Dados SQL
/*import connect from "./db.js";

async function insertSupplier(supplier) {
    const conn = await connect();               //entra no processo em db e retorna a conexao
    try {
        const sql = "INSERT INTO suppliers (name, cnpj, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *"    //Para evitar SQL Injection, evita concatenar parâmtros diretamente no comando SQL utilizando concatenação de strings, e sim passar os parametros como uma array para a funçao
    const values = [supplier.name, supplier.cnpj, supplier.phone, supplier.email, supplier.address];
    const res = await conn.query(sql, values);
    return res.rows[0];                                //rows -> é uma propriedade que utilizamos para acessar os registros obtidos a partir de uma consulta no banco de dados, que são retornados em um objeto.
    } catch (err) {
        throw err;
    } finally {                                     //sempre será executado, portanto passará pelo finally e cair no release para poder ser fechado a conexão
        conn.release();                             //garantia de fechar(liberar) a conexão. Release é a funçao utilizada para avisar o pool de conexões que aquela conexao não será mais utilizada.
    }
}

async function getSuppliers() {                   //buscar suppliers -> agora que já esta todo configurado, iremos fazer ao contrario
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM suppliers");      //a consulta retorna todos os supplieres
        return res.rows;                                            //o retorno rows retorna toda a lista
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function getSupplier(id) {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM suppliers WHERE supplier_id = $1", [id]);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function deleteSupplier(id) {
    const conn = await connect();
    try {
        await conn.query("DELETE FROM suppliers WHERE supplier_id = $1", [id]);
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function updateSupplier(supplier) {
    const conn = await connect();
    try {
        const sql = 
            "UPDATE suppliers " +
            "   SET name = $1, cnpj = $2, phone = $3, email = $4, address = $5 " +
            " WHERE supplier_id = $6 RETURNING *";
        const values = [supplier.name, supplier.cnpj, supplier.phone, supplier.email, supplier.address, supplier.supplier_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

export default {
    insertSupplier,
    getSuppliers,
    getSupplier,
    updateSupplier,
    deleteSupplier
}*/