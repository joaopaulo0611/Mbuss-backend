import { sql } from './db.js'

sql`
  CREATE TABLE Usuarios(
      id_usuario text PRIMARY KEY,
      nome character varying(255),
      email character varying(255),
      senha character varying(255),
      cpf character varying(15),
      telefone character varying(255),
      endereco character varying(255)
  );

  CREATE TABLE Produtos(
      id_produto text PRIMARY KEY,
      tamanho character varying(5),
      valor text,
      quantidade int,
      descricao character varying(255)
  );

  CREATE TABLE Vendas(
      id_venda text PRIMARY KEY,
      id_usuario text,
      FOREIGN KEY (id_usuario) REFERENCES Usuarios (id_usuario),
      status_venda BOOLEAN,
      metodo_pagamento character varying(255)
      valor_venda text
  );

  CREATE TABLE VendasProduto(
      id_vendasProduto text PRIMARY KEY,
      id_produto text,
      FOREIGN KEY (id_produto) REFERENCES Produtos (id_produto),
      id_venda text,
      FOREIGN KEY (id_venda) REFERENCES Vendas (id_venda),
  );
`.then(() => {
  console.log('tabela criada');
})