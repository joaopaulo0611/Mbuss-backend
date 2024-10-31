import { fastify } from 'fastify';
import cors from '@fastify/cors';
import { DatabasePostgres } from './database-postgres.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    const { email, senha } = request.body;
    try {
        // Verificar se o usuário existe
        const usuarios = await databasePostgres.findUsuarioByEmail(email);
        const usuario = usuarios[0]; // Assumindo que findUsuarioByEmail retorna uma lista

        if (!usuario) {
            console.warn('Usuário não encontrado:', email);
            return reply.status(404).send({ message: 'Usuário não encontrado' });
        }

        // Comparar a senha fornecida com a senha do banco
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            console.warn('Senha incorreta para o usuário:', email);
            return reply.status(401).send({ message: 'Credenciais inválidas' });
        }

        // Gerar um token JWT
        const token = jwt.sign({ id: usuario.id_usuario, email: usuario.email }, JWT_SECRET, {
            expiresIn: '1h',
        });
        console.log('Login bem-sucedido para o usuário:', email);

        return reply.send({ token });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        return reply.status(500).send({ message: 'Erro interno ao realizar login' });
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
