//essa pasta (Model) serve para mapear as entidades(tabelas do DB para classes)
import Sequelize from "sequelize";
import db from "../repositories/db.js";

const Client = db.define('clients', {
    clientId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { underscored: true });                          //ele trabalha só em camelCase e essa função irá padronizar nesse formato, já que antes estávamos trabalhando com underline(por exemplo -> clients_id)

export default Client;

