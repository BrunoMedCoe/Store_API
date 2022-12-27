//Realizando pelo Mongoose
import { query } from "express";
import ProductInfoSchema from "../schemas/productInfo.schema.js";
import { connect } from "./mongo.db.js";

async function createProductInfo(productInfo) {                         //criando um produto pelo mongoose.
    try {
        const mongoose = await connect();
        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);   //a função (model) -> onde o mongoose tira a informação do schema e instancia no model que é a classe resposnsável por alterar as "coisas" no mongoose.
        productInfo = new ProductInfo(productInfo);                             //o mongoose encapsula as propriedades para ser utilizado
        await productInfo.save();
    } catch (err) {
        throw err;
    }
}

async function updateProductInfo(productInfo) {                             //atualização de um produto pelo mongoose.
    try {
        const mongoose = await connect();
        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
        await ProductInfo.findOneAndUpdate({ productId: productInfo.productId }, productInfo);   //função findOneAndUpdate -> ele sozinho já busca e atualiza o valor do produto.
    } catch (err) {
        throw err;
    }
}

async function getProductInfo(productId) {                             //buscar um produto pelo mongoose.
    try {
        const mongoose = await connect();
        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
        const query = ProductInfo.findOne({ productId: productId });   //função findOne -> busca um produto.
        return await query.exec();                                      //a função findOne returna uma query, por isso precisa do (.exec()) para executar essa consulta.
    } catch (err) {
        throw err;
    }
}

async function getProductsInfo() {                             //buscar todos os produtos pelo mongoose.
    try {
        const mongoose = await connect();
        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
        const query = ProductInfo.find({});                             //função find -> busca todos os produtos. Para isso, não precisa passar os parâmetros de filtro que selecionam qual item a ser buscado.
        return await query.exec();                                      //a função find returna uma query, por isso precisa do (.exec()) para executar essa consulta.
    } catch (err) {
        throw err;
    }
}

async function deleteProductInfo(productId) {                             //deleta um produto pelo mongoose.
    try {
        const mongoose = await connect();
        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
        await ProductInfo.deleteOne({ productId });                          //função delteOne deleta um produto com o filtro indicado -> ({}).
    } catch (err) {
        throw err;
    }
}

async function createReview(review, productId) {                    //função para criar o REVIEW
    try {
        const productInfo = await getProductInfo(productId);        //chamando o getProductInfo que foi criado acima.
        productInfo.reviews.push(review);
        await updateProductInfo(productInfo);                       //chamando o updateProductInfo que foi criado acima.
    } catch (err) {
        throw err;
    }
}

async function deleteReview(productId, index) {                     //função para deleter um index do review
    try {
        const productInfo = await getProductInfo(productId);        //chamando o getProductInfo que já foi criado (acima).
        productInfo.reviews.splice(index, 1);                       //função splice que delete o item 1 do index. OBS: Poderia utilizar outros métodos, como por exemplo o (Slice).
    } catch (err) {
        throw err;
    }
}

export default { 
    createProductInfo, 
    updateProductInfo, 
    getProductInfo, 
    createReview, 
    deleteReview, 
    getProductsInfo, 
    deleteProductInfo 
};





//Realizando pelo drive nativo MongoDB
/*import { getClient } from "./mongo.db.js";

async function createProductInfo(productInfo) {
    const client = getClient();
    try {
        await client.connect();
        await client.db("store").collection("productInfo").insertOne(productInfo);  //inserindo um novo registro.
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }
}

async function updateProductInfo(productInfo) {    //quando quer atualizar um registro (updateOne).
    const client = getClient();
    try {
        await client.connect();
        await client.db("store").collection("productInfo").updateOne(   //na atualização, precisa passar mais de um parâmetro, a query(filtrar o primeiro registro) e o segundo paramatro são os objetos de fato.
            {productId: productInfo.productId},                         //query
            {$set: {...productInfo}}                                    //objetos -> utilizar essa metodologia de ($).
        );
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }
}

async function getProductInfo(productId) {               //para buscar um registro
    const client = getClient();
    try {
        await client.connect();
        return await client.db("store").collection("productInfo").findOne({productId});     //findOne -> buscar um registro. o objeto dentro do {} é o filtro do parametro.
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }
}

async function createReview(review, productId) {                    //função para criar o REVIEW
    try {
        const productInfo = await getProductInfo(productId);        //chamando o getProductInfo que foi criado acima.
        productInfo.reviews.push(review);
        await updateProductInfo(productInfo);                       //chamando o updateProductInfo que foi criado acima.
    } catch (err) {
        throw err;
    }
}

async function deleteReview(productId, index) {                     //função para deleter um index do review
    try {
        const productInfo = await getProductInfo(productId);        //chamando o getProductInfo que já foi criado (acima).
        productInfo.reviews.splice(index, 1);                       //função splice que delete o item 1 do index. OBS: Poderia utilizar outros métodos, como por exemplo o (Slice).
    } catch (err) {
        throw err;
    }
}

async function getProductsInfo() {               //criando uma função para buscar TODOS ou a varios registros(FindAll), diferentemente do apresentado acima, onde buscava somete 1 resgistro(findOne).
    const client = getClient();
    try {
        await client.connect();
        return await client.db("store").collection("productInfo").find({}).toArray();     //find() -> buscar todos os registros se tiver o array vazio. Caso contrario, se tiver os indices dentro do array, ele retornará os selecionados). O objeto dentro do {} é o filtro do parametro.
    } catch (err) {                                                         //toArray é para converter em array para buscar mais de um resultado em forma de lista.
        throw err;
    } finally {
        await client.close();
    }
}

async function deleteProductInfo(productId) {               //para deletar 1 registro
    const client = getClient();
    try {
        await client.connect();
        return await client.db("store").collection("productInfo").deleteOne({productId});     //deleteOne -> deletar um registro. o objeto dentro do {} é o filtro do parametro.
    } catch (err) {
        throw err;
    } finally {
        await client.close();
    }
}

export default { 
    createProductInfo, 
    updateProductInfo, 
    getProductInfo, 
    createReview, 
    deleteReview, 
    getProductsInfo, 
    deleteProductInfo 
};*/