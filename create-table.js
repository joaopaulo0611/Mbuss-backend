import { sql } from './db.js'

sql`
CREATE TABLE Cartao (
  id_cartao text PRIMARY KEY,
  numero character varying(255),
  nome_titular character varying(255),
  vencimento character varying(255),
  seguranca character varying(255)
);

CREATE TABLE Usuarios (
  id_usuario text PRIMARY KEY,
  nome character varying(255),
  email character varying(255),
  senha character varying(255),
  cpf character varying(15),
  telefone character varying(255),
  id_cartao text,  -- Corrigido: agora a vírgula separa as colunas
  FOREIGN KEY (id_cartao) REFERENCES Cartao(id_cartao)  -- Correção na definição da chave estrangeira
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