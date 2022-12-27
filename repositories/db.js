/*import pg from "pg";

async function connect() {
    if (global.connection) {
        return global.connection.connect();
    }
//esse codigo abaixo (pool) será executado uma unica vez, pois nas proximas vezes ele será barrado no if e gerará uma nova conexão. Sendo assim, nos repositories será mais clean
    const pool = new pg.Pool({          //essa biblioteca gerencia as conexções sem ter que ficar abrindo toda hora
        connectionString: "postgres://guqimhvq:GFv-GC0qQ6ec5PHgCuIqhffOf1qXwVTs@tyke.db.elephantsql.com/guqimhvq"
    });
    global.connection = pool;           //firma global para servir para todos
    
    return pool.connect();
}

export {
    connect
} */

//Utilizando outra forma de trabalhar com o DB com o ORM Sequelize, por isso ficará comentado acima a versão anterior
import Sequelize from "sequelize";

const sequelize = new Sequelize(
    "postgres://guqimhvq:GFv-GC0qQ6ec5PHgCuIqhffOf1qXwVTs@tyke.db.elephantsql.com/guqimhvq", 
    {
        dialect: "postgres",                               //optamos  por escolher este DB, mas o sequelize interage com varios outros.
        define: {
            timestamps: false                           //false para não criar tabelas, pois a biblioteca sequilize ja possui em sua estrutura.
        }
    }
)

export default sequelize;