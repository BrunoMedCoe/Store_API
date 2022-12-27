import SaleRepository from "../repositories/sale.repository.js"
import ClientRepository from "../repositories/client.repository.js"     //realizando a iportação para a validção da mensagem de erro
import ProductRepository from "../repositories/product.repository.js"   //realizando a iportação para a validção da mensagem de erro

async function createSale(sale) {
    let error = "";                                                      //serve para concatenar os erros numa mesma mensagem, para que o usuário possa saber quai os erros.
    if (!await ClientRepository.getClient(sale.clientId)) {
        error = "O client ID informado não existe!";
    }
    const product = await ProductRepository.getProduct(sale.productId)
    if (!product) {
        error += " O product ID informado não existe!";
    }
    if (error) {
        throw new Error(error);
    }
    if (product.stock > 0) {                                            //validação do estoque na Venda
        sale = await SaleRepository.insertSale(sale);
        product.stock--;
        await ProductRepository.updateProduct(product);
        return sale;
    } else {
        throw new Error("O produto informado não possui estoque!")
    }
}

async function getSales(productId) {                                //Criando Query String (filtro na sua URL -> insere como ?.....)
    if (productId) {
        return await SaleRepository.getSalesByProductId(productId);
    }
    return await SaleRepository.getSales();
}

async function getSale(id) {
    return await SaleRepository.getSale(id);
}

async function deleteSale(id) {
    const sale = await SaleRepository.getSale(id);
    if (sale) {
        const product = await ProductRepository.getProduct(sale.productId);
        await SaleRepository.deleteSale(id);
        product.stock++;
        await ProductRepository.updateProduct(product);
    } else {
        throw new Error("O id da sale informado não existe!");
    }
}

async function updateSale(sale) {
    let error = "";
    if (!await ClientRepository.getClient(sale.clientId)) {
        error = "O client_id informado não existe!";
    }
    if (!await ProductRepository.getProduct(sale.productId)) {
        error += " O product_id informado não existe!";
    }
    if (error) {
        throw new Error(error);
    }
    return await SaleRepository.updateSale(sale);
}

export default {
    createSale,
    getSales,
    getSale,
    deleteSale,
    updateSale
}