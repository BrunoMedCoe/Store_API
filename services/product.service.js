import ProductRepository from "../repositories/product.repository.js"
import SupplierRepository from "../repositories/supplier.repository.js"     //está importando para que possa fazer um tratamento (validação) para o usuário uanso der um erro no supplier na tabela do product, pois como está vinculada e o erro vem direto do db e fica mais elegante melhorar a resposta do erro. 
import SaleRepository from "../repositories/sale.repository.js";
import ProductInfoRepository from "../repositories/productInfo.repository.js";      //é importado para poder utilizar as informações para o mongodb junto com as informações existentes, evitando assim de não criar uma nova pasta.

async function createProduct(product) {
    if (await SupplierRepository.getSupplier(product.supplierId)) {
        return await ProductRepository.insertProduct(product);
    }
    throw new Error("O Supplier ID informado não existe!");
}

async function getProducts() {
    return await ProductRepository.getProducts();
}

async function getProduct(id) {             //nessa função, teve que incrementar o productInfo para conciliar com o MongoDB.
    const product = await ProductRepository.getProduct(id);
    product.info = await ProductInfoRepository.getProductInfo(parseInt(id));    //o parseInt é necessário pois no mongo ele não aceita string, somente inteiro.
    return product;
}

async function deleteProduct(id) {
    const sales = await SaleRepository.getSalesByProductId(id);               //essa função serve para validar os produtos que já foram vendidos não serem excluidos do sistema.
    if (sales.length > 0) {
        throw new Error("Não é possivel excuir o produto pois ele tem vendas.");
    }
    await ProductRepository.deleteProduct(id);
}

async function updateProduct(product) {
    if (await SupplierRepository.getSupplier(product.supplierId)) {
        return await ProductRepository.updateProduct(product);
    }
    throw new Error("O supplier ID não existe!")
};

async function createProductInfo(productInfo) {                           //criando a função aue será encaminhada para o mongodb
    await ProductInfoRepository.createProductInfo(productInfo);
}

async function updateProductInfo(productInfo) {                            //idem
    await ProductInfoRepository.updateProductInfo(productInfo);
}

async function createReview(review, productId) {                            //criando a fun~çao que passará o Review para o mongoDB.
    await ProductInfoRepository.createReview(review, productId);
}

async function deleteReview(productId, index) {                            //função que delterá o index do Review e passará para o mongoDB.
    await ProductInfoRepository.deleteReview(parseInt(productId), index);
}

async function getProductsInfo() {                                       //criando função para buscar todos os registros.
    return await ProductInfoRepository.getProductsInfo();
}

async function deleteProductInfo(productId) {             //função para deletar um registro. Nessa função, teve que incrementar o productInfo para conciliar com o MongoDB.
    await ProductInfoRepository.deleteProductInfo(productId)
}

export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createProductInfo,
    updateProductInfo,
    createReview,
    deleteReview,
    getProductsInfo,
    deleteProductInfo
}