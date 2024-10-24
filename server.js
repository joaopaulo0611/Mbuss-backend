
import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify();
const databasePostgres = new DatabasePostgres;

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// ENDPOINTS (CRUD USUARIO):

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
