import { sql } from './db.js'

sql`
  CREATE TABLE Produtos (
  id_produto text PRIMARY KEY NOT NULL, 
  nome character varying(255),
  tamanho character varying(5),
  valor FLOAT,
  quantidade int,
  descricao character varying(1000),
  imagem text
);

CREATE TABLE Usuarios (
  id_usuario text PRIMARY KEY,
  nome character varying(255),
  email character varying(255),
  senha character varying(255),
  cpf character varying(15),
  telefone character varying(255)
);

INSERT INTO Produtos 
(id_produto, nome, tamanho, valor, quantidade, descricao, imagem)
VALUES 
(1, 
 'SHOP KART Black Tee', 
 'M', 
 189, 
 10,
 'SHOP KART Black Tee é uma camiseta confeccionada com gola em ribana de 3cm,
 tem mangas e modelagem mais ampla com foco em um caimento perfeito ao corpo. O material
 escolhido é um algodão de gramatura elevada que proporciona conforto e veste de forma fluída.', 
 'http://localhost:5173/src/images/CamisetaCarrinho.png');


INSERT INTO Produtos 
(id_produto, nome, tamanho, valor, quantidade, descricao, imagem)
VALUES 
(2, 
 'BASEBALL BAT Black Tee', 
 'M', 
 189, 
 10,
 'BASEBALL BAT Black Tee é uma camiseta confeccionada com gola em ribana de 3cm,
 tem mangas e modelagem mais ampla com foco em um caimento perfeito ao corpo. O material
 escolhido é um algodão de gramatura elevada que proporciona conforto e veste de forma fluída.', 
 'http://localhost:5173/src/images/CamisetaTaco.png');


INSERT INTO Produtos 
(id_produto, nome, tamanho, valor, quantidade, descricao, imagem)
VALUES 
(3, 
 'PUNCH Black Tee', 
 'M', 
 189, 
 10,
 'PUNCH Black Tee é uma camiseta confeccionada com gola em ribana de 3cm,
 tem mangas e modelagem mais ampla com foco em um caimento perfeito ao corpo. O material
 escolhido é um algodão de gramatura elevada que proporciona conforto e veste de forma fluída.', 
 'http://localhost:5173/src/images/CamisetaLuta.png');
`.then(() => {
  console.log('tabela criada');
})