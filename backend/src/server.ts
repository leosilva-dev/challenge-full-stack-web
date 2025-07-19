import Fastify, { FastifyInstance, FastifyServerOptions } from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

export type RouteConfig = {
  registerRoutes: (app: FastifyInstance) => void;
};

export const createServer = (
  options: FastifyServerOptions,
  routes: RouteConfig
) => {
  const app = Fastify(options);

  app.setErrorHandler(errorHandler);

  app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  });

  app.setNotFoundHandler((_, reply) => {
    reply.code(404).send({ message: "Route not found" });
  });

  routes.registerRoutes(app);

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
