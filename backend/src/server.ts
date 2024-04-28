import 'dotenv/config';
import fastify from 'fastify';

const app = fastify();

app.get('/', (request, reply) => {
  return reply.status(200).send({ message: 'hello world' });
});

const startServer = async () => {
  try {
    await app.listen({ port: 3333 });
    console.log(`Server is running on port 3333 🔥`);
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
};

startServer();
