//Banco de Dados SQL com ORM
//realizar pelo Sequelize -> Obtem o mesmo resultado da maneira descrita anteriormente realizando "por debaixo dos panos", com isso a expressão fica bem mais clean e simples.
import Product from "../models/product.model.js";

async function insertProduct(product) {
    try {
        return await Product.create(product);
    } catch (err) {
        throw err;
    }
}

async function getProducts() {
    try {
        return await Product.findAll();                  //o findAll é uma função embutida que retorna tudo.
    } catch (err) {
        throw err;
    }
}

async function getProduct(id) {
    try {
        return await Product.findByPk(id, { raw: true });               //essa função ele busca o Primery Key (Pk), que já esta definida no (product Model).
    } catch {                             //o parâmtro {raw:true} foi inserido pelo fato de estar usando o mongoDb juntamente com o Sequelize, obtendo assim informções em objeto json.
        throw err;
    }
}

async function deleteProduct(id) {
    try {
        await Product.destroy({                      //função que deleta, porém precisa especificar..no caso, o (id).
            where: {
                productId: id
            }
        });
    } catch (err) {
        throw err;
    }
}

async function updateProduct(product) {
    try {
        await Product.update(product, {               //função que atualiza, precisa passar o (where) para que o sequelize entenda corretamente.
            where: {
                productId: product.productId
            }
        });
        return await getProduct(product.productId)
    } catch (err) {
        throw err;
    }
}

export default {
    insertProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}




/*import connect from "./db.js";

async function insertProduct(product) {
    const conn = await connect();               //entra no processo em db e retorna a conexao
    try {
        const sql = "INSERT INTO products (name, description, value, stock, supplier_id) VALUES ($1, $2, $3, $4, $5) RETURNING *"    //Para evitar SQL Injection, evita concatenar parâmtros diretamente no comando SQL utilizando concatenação de strings, e sim passar os parametros como uma array para a funçao
    const values = [product.name, product.description, product.value, product.stock, product.supplier_id];
    const res = await conn.query(sql, values);
    return res.rows[0];                                //rows -> é uma propriedade que utilizamos para acessar os registros obtidos a partir de uma consulta no banco de dados, que são retornados em um objeto.
    } catch (err) {
        throw err;
    } finally {                                     //sempre será executado, portanto passará pelo finally e cair no release para poder ser fechado a conexão
        conn.release();                             //garantia de fechar(liberar) a conexão. Release é a funçao utilizada para avisar o pool de conexões que aquela conexao não será mais utilizada.
    }
}

async function getProducts() {                   //buscar products -> agora que já esta todo configurado, iremos fazer ao contrario
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM products");      //a consulta retorna todos os productes
        return res.rows;                                            //o retorno rows retorna toda a lista
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function getProduct(id) {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM products WHERE product_id = $1", [id]);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function deleteProduct(id) {
    const conn = await connect();
    try {
        await conn.query("DELETE FROM products WHERE product_id = $1", [id]);
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function updateProduct(product) {
    const conn = await connect();
    try {
        const sql = 
            "UPDATE products " +
            "   SET name = $1, description = $2, value = $3, stock = $4, supplier_id = $5 " +
            " WHERE product_id = $6 RETURNING *";
        const values = [product.name, product.description, product.value, product.stock, product.supplier_id, product.product_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

export default {
    insertProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} */


