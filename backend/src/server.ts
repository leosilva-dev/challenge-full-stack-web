import 'dotenv/config';
import fastify from 'fastify';
import { routes } from './routes/routes';

export const app = fastify();

app.register(routes);

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
