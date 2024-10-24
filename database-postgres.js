import { randomUUID } from "crypto";
import { sql } from './db.js';

//USUARIO
export class DatabasePostgres { 
  async listUsuarios() {
    const usuario = await sql`select * from Usuarios`;
    return usuario;
  }

  async createUsarios(usuario) {
    const id = randomUUID();
    const nome = usuario.nome;
    const email = usuario.email;
    const senha = usuario.senha;
    const cpf = usuario.cpf
    const telefone = usuario.telefone
    const endereco = usuario.endereco
    
    await sql`insert into Usuarios (id_usuario, nome, email, senha, cpf, telefone, endereco)
    values (${id}, ${nome}, ${email}, ${senha}, ${cpf}, ${telefone}, ${endereco})`
  }

  async updateUsuarios(id, usuario) {
    const nome = usuario.nome;
    const email = usuario.email;
    const senha = usuario.senha;
    const cpf = usuario.cpf;
    const telefone = usuario.telefone;
    const endereco = usuario.endereco;

    await sql`update Usuarios set 
        nome = ${nome},
        email = ${email},
        senha = ${senha},
        cpf = ${cpf},
        telefone = ${telefone},
        endereco = ${endereco}
        where id_usuario = ${id}
    `;
  }

  async deleteUsuarios(id) {
    await sql`delete from Usuarios where id_usuario = ${id}`
  }

  //PRODUTOS
  async listProdutos() {
    const produtos = await sql`select * from Produtos`;
    return produtos;
  }

  async createProduto(produto) {
    const id_produto = randomUUID();
    const nome = produto.nome;
    const tamanho = produto.tamanho;
    const valor = produto.valor;
    const quantidade = produto.dquantidade;
    const descricao = produto.descricao;
    
    await sql`insert into Produto (id_produto, tamanho, valor, quantidade, descricao)
    values (${id_produto}, ${nome}, ${tamanho}, ${valor}, ${quantidade}, ${descricao})`
  }

  async updateProduto(id_produto, produto) {
    const nome = produto.nome
    const tamanho = produto.tamanho;
    const valor = produto.valor;
    const quantidade = produto.dquantidade;
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

  async deleteProduto(id_produto) {
    await sql`delete from Produtos where id_produto = ${id_produto}`
  }

}