import { FastifyServerOptions } from "fastify";
import { createServer } from "./server";

const serverOptions: FastifyServerOptions = { logger: true };
const serverConfig = {};

const server = createServer(serverOptions, serverConfig);

try {
  server.start();
} catch (error) {
  console.error("Failed to start server:", error);
  process.exit(1);
}
