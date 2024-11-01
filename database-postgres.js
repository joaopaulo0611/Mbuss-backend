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

  // Produtos
  async listProdutos() {
    const produtos = await sql`select * from Produtos`;
    return produtos;
  }

  async createProdutos(produto) {
    const id_produto = randomUUID();
    const nome = produto.nome;
    const tamanho = produto.tamanho;
    const valor = produto.valor;
    const quantidade = produto.quantidade;
    const descricao = produto.descricao;
    
    await sql`insert into Produtos (id_produto, nome, tamanho, valor, quantidade, descricao)
    values (${id_produto}, ${nome}, ${tamanho}, ${valor}, ${quantidade}, ${descricao})`;
  }

  async updateProdutos(id_produto, produto) {
    const nome = produto.nome;
    const tamanho = produto.tamanho;
    const valor = produto.valor;
    const quantidade = produto.quantidade;
    const descricao = produto.descricao;

    await sql`update Produtos set 
        nome = ${nome},
        tamanho = ${tamanho},
        valor = ${valor},
        quantidade = ${quantidade},
        descricao = ${descricao}
        where id_produto = ${id_produto}
    `;
  }

  async deleteProdutos(id_produto) {
    await sql`delete from Produtos where id_produto = ${id_produto}`;
  }
}