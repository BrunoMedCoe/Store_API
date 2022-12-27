import Sequelize from "sequelize";
import db from "../repositories/db.js";
import Supplier from "./supplier.model.js";

const Product = db.define('products', {
    productId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, { underscored: true });

Product.belongsTo(Supplier, { foreignKey: "supplierId" });                                     //essa propriedade quer dizer que quertence a alguem, nesse caso, o (product) pertence ao (Supplier), por isso que tem q importar o supplier. 

export default Product;
