import { FastifyServerOptions } from "fastify";
import { createServer, RouteConfig } from "./server";
import { registerRoutes } from "./routes";

const serverOptions: FastifyServerOptions = { logger: true };
const routesConfig: RouteConfig = { registerRoutes };

const server = createServer(serverOptions, routesConfig);

try {
  server.start();
} catch (error) {
  console.error("Failed to start server:", error);
  process.exit(1);
}
