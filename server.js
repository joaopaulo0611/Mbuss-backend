
import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { DatabasePostgres } from './database-postgres.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const server = fastify();
const databasePostgres = new DatabasePostgres;

// CORS
server.register(cors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

//CRUD USUARIO
// CREATE
server.post('/usuarios', async (request, reply) => {
    const body = request.body;
    await databasePostgres.createUsarios(body);
    return reply.status(201).send();
})

// READ
server.get('/usuarios', async () => {
    const Usuarios = await databasePostgres.listUsuarios();
    return Usuarios;
});

// UPDATE
server.put('/usuarios/:id', async (request, reply) => {
    const usuarioID = request.params.id;
    const body = request.body;
    await databasePostgres.updateUsuarios(usuarioID, body);

    return reply.status(204).send();
})

// DELETE
server.delete('/usuarios/:id', async (request, reply) => {
    const usuarioID = request.params.id;
    await databasePostgres.deleteUsuarios(usuarioID);

    return reply.status(204).send();
})


server.listen({
    port: 3333
});


// (CRUD PRODUTO):
// CREATE
server.post('/produtos', async (request, reply) => {
    const body = request.body;
    await databasePostgres.createProdutos(body);
    return reply.status(201).send();
})

// READ
server.get('/produtos', async () => {
    const Produtos = await databasePostgres.listProdutos();
    return Produtos;
});

// UPDATE
server.put('/produtos/:id', async (request, reply) => {
    const produtoID = request.params.id;
    const body = request.body;
    await databasePostgres.updateProdutos(produtoID, body);

    return reply.status(204).send();
})

// DELETE
server.delete('/produtos/:id', async (request, reply) => {
    const produtoID = request.params.id;
    await databasePostgres.deleteProdutos(produtoID);

    return reply.status(204).send();
})


server.listen({
    port: 3333
});


//LOGIN
const JWT_SECRET = 'senhaJWT'; // Defina uma chave secreta forte

server.post('/login', async (request, reply) => {
    const { email, senha } = request.body;

    // Verificar se o usuário existe
    const usuarios = await databasePostgres.findUsuarioByEmail(email);
    const usuario = usuarios[0]; // Assumindo que o findUsuarioByEmail retorna uma lista

    if (!usuario) {
        return reply.status(404).send({ message: 'Usuário não encontrado' });
    }

    // Comparar a senha fornecida com a senha do banco
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
        return reply.status(401).send({ message: 'Credenciais inválidas' });
    }

    // Gerar um token JWT
    const token = jwt.sign({ id: usuario.id_usuario, email: usuario.email }, JWT_SECRET, {
        expiresIn: '1h',
    });

    return reply.send({ token });
});
