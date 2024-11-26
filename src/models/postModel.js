import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../../SRC/config/dbConfig.js"

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)
// Conecta ao banco de dados usando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO e armazena a conexão em uma constante


export async function getTodosPosts() {
    const db = conexao.db("Imersão-instabyte");
    // Obtém o banco de dados chamado "Imersão-instabyte" da conexão estabelecida
    const colecao = db.collection("posts");
    // Obtém a coleção de posts dentro do banco de dados
    return colecao.find().toArray();
    // Executa uma consulta para encontrar todos os documentos (posts) na coleção e retorna os resultados como um array
}

export async function criarPost(novoPost) {
    const db = conexao.db("Imersão-instabyte");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
} 

export async function atualizarPost(id, novoPost){
    const db = conexao.db("Imersão-instabyte");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}; 