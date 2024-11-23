import { sql } from './db.js'

sql`

CREATE TABLE Usuarios (
  id_usuario text PRIMARY KEY,
  nome character varying(255),
  email character varying(255),
  senha character varying(255),
  cpf character varying(15),
  telefone character varying(255),
);

CREATE TABLE Produtos (
  id_produto text PRIMARY KEY,
  nome character varying(255),
  tamanho character varying(5),
  valor FLOAT,
  quantidade int,
  descricao character varying(255),
  imagem text
);
`.then(() => {
  console.log('tabela criada');
})