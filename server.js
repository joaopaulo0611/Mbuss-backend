import { fastify } from 'fastify';
import cors from '@fastify/cors';
import { DatabasePostgres } from './database-postgres.js';

const fastify = require('fastify')({ logger: true });
const path = require('path');
const multer = require('fastify-multipart');

// Middleware para uploads de arquivos
fastify.register(multer.contentParser);

// Configuração do diretório para armazenar imagens
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const fs = require('fs');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

fastify.register(require('fastify-static'), {
  root: UPLOAD_DIR,
  prefix: '/uploads/',
});



const server = fastify();
const databasePostgres = new DatabasePostgres();

// CORS
server.register(cors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
});

// Constantes de configuração
const JWT_SECRET = 'senhaJWT'; // Defina uma chave secreta forte

// CRUD USUARIO
// CREATE
server.post('/usuarios', async (request, reply) => {
    const body = request.body;
    try {
        await databasePostgres.createUsuarios(body);
        console.log('Usuário criado com sucesso:', body);
        return reply.status(201).send();
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return reply.status(500).send({ message: 'Erro interno ao criar usuário' });
    }
});

// READ
server.get('/usuarios', async (request, reply) => {
    try {
        const Usuarios = await databasePostgres.listUsuarios();
        console.log('Lista de usuários retornada com sucesso');
        return Usuarios;
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        return reply.status(500).send({ message: 'Erro interno ao listar usuários' });
    }
});

// UPDATE
server.put('/usuarios/:id', async (request, reply) => {
    const usuarioID = request.params.id;
    const body = request.body;
    try {
        await databasePostgres.updateUsuarios(usuarioID, body);
        console.log(`Usuário ${usuarioID} atualizado com sucesso`);
        return reply.status(204).send();
    } catch (error) {
        console.error(`Erro ao atualizar usuário ${usuarioID}:`, error);
        return reply.status(500).send({ message: 'Erro interno ao atualizar usuário' });
    }
});

// DELETE
server.delete('/usuarios/:id', async (request, reply) => {
    const usuarioID = request.params.id;
    try {
        await databasePostgres.deleteUsuarios(usuarioID);
        console.log(`Usuário ${usuarioID} deletado com sucesso`);
        return reply.status(204).send();
    } catch (error) {
        console.error(`Erro ao deletar usuário ${usuarioID}:`, error);
        return reply.status(500).send({ message: 'Erro interno ao deletar usuário' });
    }
});

// CRUD PRODUTO
// CREATE
server.post('/produtos', async (request, reply) => {
    const body = request.body;
    try {
        await databasePostgres.createProdutos(body);
        console.log('Produto criado com sucesso:', body);
        return reply.status(201).send();
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        return reply.status(500).send({ message: 'Erro interno ao criar produto' });
    }
});

// READ
server.get('/produtos', async (request, reply) => {
    try {
        const Produtos = await databasePostgres.listProdutos();
        console.log('Lista de produtos retornada com sucesso');
        return Produtos;
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        return reply.status(500).send({ message: 'Erro interno ao listar produtos' });
    }
});

// UPDATE
server.put('/produtos/:id', async (request, reply) => {
    const produtoID = request.params.id;
    const body = request.body;
    try {
        await databasePostgres.updateProdutos(produtoID, body);
        console.log(`Produto ${produtoID} atualizado com sucesso`);
        return reply.status(204).send();
    } catch (error) {
        console.error(`Erro ao atualizar produto ${produtoID}:`, error);
        return reply.status(500).send({ message: 'Erro interno ao atualizar produto' });
    }
});

// DELETE
server.delete('/produtos/:id', async (request, reply) => {
    const produtoID = request.params.id;
    try {
        await databasePostgres.deleteProdutos(produtoID);
        console.log(`Produto ${produtoID} deletado com sucesso`);
        return reply.status(204).send();
    } catch (error) {
        console.error(`Erro ao deletar produto ${produtoID}:`, error);
        return reply.status(500).send({ message: 'Erro interno ao deletar produto' });
    }
});

// LOGIN
server.post('/login', async (request, reply) => {
    const credentials = request.body;
    const user = await databasePostgres.verificarSeTemUsuarioCadastrado(credentials);
    
    if (user.length > 0) {
        console.log("Login success");
        return reply.status(200).send({ success: true, user }); // Retorne os dados do usuário
    } else {
        console.log("Login failed");
        return reply.status(200).send({ success: false });
    }
});


// Iniciar o servidor
server.listen({ port: 3333 }, (err, address) => {
    if (err) {
        console.error('Erro ao iniciar o servidor:', err);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
});

fastify.post('/produtos', async (request, reply) => {
    const { nome, tamanho, valor, quantidade, descricao } = request.body;
  
    // Processar imagem
    const files = request.raw.files;
    if (!files || !files.imagem) {
      return reply.status(400).send({ error: 'Imagem é obrigatória.' });
    }
  
    const file = files.imagem;
    const filePath = path.join(UPLOAD_DIR, file.filename);
    await file.toFile(filePath);
  
    // Inserir no banco de dados
    const client = await fastify.pg.connect();
    try {
      const query = `
        INSERT INTO produtos (nome, tamanho, valor, quantidade, descricao, imagem)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id_produto;
      `;
      const values = [nome, tamanho, valor, quantidade, descricao, `/uploads/${file.filename}`];
      const result = await client.query(query, values);
      reply.status(201).send({ id_produto: result.rows[0].id_produto });
    } catch (error) {
      reply.status(500).send(error);
    } finally {
      client.release();
    }
  });
  
  // Iniciar o servidor
  fastify.listen(3000, (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info('Servidor rodando em http://localhost:3000');
  });