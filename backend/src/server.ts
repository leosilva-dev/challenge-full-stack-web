import Fastify, { FastifyInstance, FastifyServerOptions } from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

dotenv.config();

type ServerConfig = {
  registerRoutes?: (app: FastifyInstance) => void;
};

export const createServer = (
  options: FastifyServerOptions = {},
  config: ServerConfig = {}
) => {
  const app = Fastify(options);

  app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  });

  if (config.registerRoutes) {
    config.registerRoutes(app);
  }

  const start = () => {
    app.listen({ port: Number(process.env.PORT) || 3333 }, (err, address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      console.log(`🔥 Server running on ${process.env.PORT}`);
    });
  };

  return { start };
};
