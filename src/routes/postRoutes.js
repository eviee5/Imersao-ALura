import express from "express"; // Importa o framework Express para criar a aplicação web.
import multer from "multer"; // Importa o middleware Multer para lidar com o upload de arquivos.
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Importa as funções para controlar as operações relacionadas a posts do arquivo postsController.js.
import cors from "cors";
const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
     // Configura o local de armazenamento para os arquivos enviados.
    destination: function (req, file, cb) {   // Define o destino onde os arquivos serão armazenados.
      cb(null, 'uploads/'); // Define a pasta "uploads/" como o destino.
    },
    filename: function (req, file, cb) {  // Define o nome dos arquivos.
      cb(null, file.originalname);  // Utiliza o nome original do arquivo.
    }
  });

const upload = multer({ dest: "./uploads", storage }); // Cria uma instância do Multer com a configuração de armazenamento.st upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {  // Define uma função que configura as rotas da aplicação.
    app.use(express.json());
     // Habilita o middleware JSON para lidar com dados JSON nas requisições.
    app.use(cors(corsOptions))
     // Rotas para manipulação de posts:
    app.get("/posts", listarPosts); 
    // Rota GET para listar todos os posts, chamando a função listarPosts.
    app.post("/posts", postarNovoPost);
    // Rota POST para criar um novo post, chamando a função postarNovoPost.
  
    // Rota para upload de imagens:
    app.post("/upload", upload.single("imagem"), uploadImagem); 
    // Rota POST para upload de imagens, usando o middleware Multer para o campo "imagem" e chamando a função uploadImagem.
    app.put("/upload/:id", atualizarNovoPost)
  };

 export default routes;
  // Exporta a função de rotas para ser utilizada em outros módulos.