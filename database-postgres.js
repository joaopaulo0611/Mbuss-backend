import { randomUUID } from "crypto";
import { sql } from './db.js';


// USUARIO E PRODUTOS
export class DatabasePostgres { 
  async verificarSeTemUsuarioCadastrado(credentials) {
    const usuario = await sql`select * from Usuarios where email = ${credentials.email} and senha = ${credentials.senha}`;
    return usuario;
  }

  // Usuários
  async listUsuarios() {
    const usuario = await sql`select * from Usuarios`;
    return usuario;
  }

  async createUsuarios(usuario) {
    const id = randomUUID();
    const nome = usuario.nome;
    const email = usuario.email;
    const senhaHasheada = usuario.senha;
    const cpf = usuario.cpf;
    const telefone = usuario.telefone;

    await sql`insert into Usuarios (id_usuario, nome, email, senha, cpf, telefone)
    values (${id}, ${nome}, ${email}, ${senhaHasheada}, ${cpf}, ${telefone})`;
  }

  async updateUsuarios(id, usuario) {
    const nome = usuario.nome;
    const email = usuario.email;
    const senha = usuario.senha;
    const cpf = usuario.cpf;
    const telefone = usuario.telefone;

    await sql`update Usuarios set 
        nome = ${nome},
        email = ${email},
        senha = ${senha},
        cpf = ${cpf},
        telefone = ${telefone}
        where id_usuario = ${id}
    `;
  }

  async deleteUsuarios(id) {
    await sql`delete from Usuarios where id_usuario = ${id}`;
  }


// Funções para Produtos
async listProdutos() {
  return await sql`SELECT * FROM Produtos`;
}

async createProduto(produto) {
  const id = randomUUID();
  const { nome, tamanho, valor, quantidade, descricao, imagem } = produto;

  await sql`
    INSERT INTO Produtos (id_produto, nome, tamanho, valor, quantidade, descricao, imagem)
    VALUES (${id}, ${nome}, ${tamanho}, ${valor}, ${quantidade}, ${descricao}, ${imagem})
  `;
}

async updateProduto(id, produto) {
  const { nome, tamanho, valor, quantidade, descricao, imagem } = produto;

  await sql`
    UPDATE Produtos
    SET nome = ${nome},
        tamanho = ${tamanho},
        valor = ${valor},
        quantidade = ${quantidade},
        descricao = ${descricao},
        imagem = ${imagem}
    WHERE id_produto = ${id}
  `;
}

async deleteProduto(id) {
  await sql`DELETE FROM Produtos WHERE id_produto = ${id}`;
}

//
async listProdutoById(id) {
  return await sql`
    SELECT nome, valor, descricao, imagem
    FROM Produtos
    WHERE id_produto = ${id}
  `;
}


//Funcao Carrinho

async listCarrinho() {
  return await sql`SELECT * FROM Carrinho`;
}

async addCarrinho(item) {
  const { id_produto, id_usuario, quantidade } = item;

  await sql`
    INSERT INTO Carrinho (id_produto, id_usuario, quantidade)
    VALUES (${id_produto}, ${id_usuario}, ${quantidade})
  `;
}

async updateCarrinho(id, quantidade) {
  await sql`
    UPDATE Carrinho
    SET quantidade = ${quantidade}
    WHERE id = ${id}
  `;
}

async deleteCarrinho(id) {
  await sql`DELETE FROM Carrinho WHERE id = ${id}`;
}

// Funcao Favoritos
}