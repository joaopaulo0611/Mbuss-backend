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


INSERT INTO Produtos 
(id_produto, nome, tamanho, valor, quantidade, descricao, imagem)
VALUES 
(1, 
 'URBAN NIGHTLIFE Black Tee', 
 'M', 
 189, 
 10,
 'URBAN NIGHTLIFE Black Tee é uma camiseta confeccionada com gola em ribana de 3cm,
 tem mangas e modelagem mais ampla com foco em um caimento perfeito ao corpo. O material
 escolhido é um algodão de gramatura elevada que proporciona conforto e veste de forma fluída.', 
 'http://localhost:5173/src/images/CamisetaJapan.png');


INSERT INTO Produtos 
(id_produto, nome, tamanho, valor, quantidade, descricao, imagem)
VALUES 
(2, 
 'SCREAM MBUSS Black Tee', 
 'M', 
 189, 
 10,
 'SCREAM MBUSS Black Tee é uma camiseta confeccionada com gola em ribana de 3cm,
 tem mangas e modelagem mais ampla com foco em um caimento perfeito ao corpo. O material
 escolhido é um algodão de gramatura elevada que proporciona conforto e veste de forma fluída.', 
 'http://localhost:5173/src/images/CamisetaGrito.png');


INSERT INTO Produtos 
(id_produto, nome, tamanho, valor, quantidade, descricao, imagem)
VALUES 
(3, 
 'FINISH LINE Black Tee', 
 'M', 
 189, 
 10,
 'FINISH LINE Black Tee é uma camiseta confeccionada com gola em ribana de 3cm,
 tem mangas e modelagem mais ampla com foco em um caimento perfeito ao corpo. O material
 escolhido é um algodão de gramatura elevada que proporciona conforto e veste de forma fluída.', 
 'http://localhost:5173/src/images/camisetaVermelha.png');


INSERT INTO Produtos 
(id_produto, nome, tamanho, valor, quantidade, descricao, imagem)
VALUES 
(4, 
 'TOKYO DRIFT Black Tee', 
 'M', 
 189, 
 10,
 'TOKYO DRIFT Black Tee é uma camiseta confeccionada com gola em ribana de 3cm,
 tem mangas e modelagem mais ampla com foco em um caimento perfeito ao corpo. O material
 escolhido é um algodão de gramatura elevada que proporciona conforto e veste de forma fluída.', 
 'http://localhost:5173/src/images/CamisetaDRIFT.png');

`.then(() => {
  console.log('tabela criada');
})