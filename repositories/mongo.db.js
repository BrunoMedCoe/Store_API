//armazenar informações adicionais sobre os produtos, complementando com o banco SQL
/*import mongodb from "mongodb";

function getClient() {
    const uri = "mongodb+srv://Brunaum:Santos85!@cluster0.2o381tn.mongodb.net/?retryWrites=true&w=majority"    //uri -> url de conexoes
    return new mongodb.MongoClient(uri);        //ele cria um objeto de conexão (client) para asua url
}

export { getClient }*/



//Realizando pelo MONGOOSE
import mongoose from "mongoose";

async function connect() {                              //o connect já faz por debaixo dos spanos a mesma função do pool. Ou seja, ele ja inicia e encerra as conexoes.
    const uri = "mongodb+srv://Brunaum:Santos85!@cluster0.2o381tn.mongodb.net/?retryWrites=true&w=majority";
    return await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });       //esses 2 parâmetros são definições já estabelecidas pelo próprio mongoose.
}

export { connect }