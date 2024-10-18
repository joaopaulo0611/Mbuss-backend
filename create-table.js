import { sql } from './db.js'

sql`
  CREATE TABLE usuarios(
      id text PRIMARY KEY,
      nome character varying(255),
      email character varying(255),
      senha character varying(255),
      cpf character varying(15),
      telefone character varying(255),
      endereco character varying(255)
  );

  CREATE TABLE produtos(
      id text PRIMARY KEY,
      tamanho character varying(5),
      valor text,
      quantidade int,
      descricao character varying(255)
  );

  CREATE TABLE vendas(
      id text PRIMARY KEY,
      id_usuario FOREIGN KEY,
      status_venda BOOLEAN ,
      valor_venda int
  );
`.then(() => {
  console.log('tabela criada');
})