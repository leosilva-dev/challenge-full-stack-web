import 'dotenv/config';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes/routes';
import { handleNotFound } from './middlewares';

export const app = fastify();

app.register(cors);
app.register(routes);
app.register(handleNotFound);

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
