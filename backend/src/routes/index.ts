import { FastifyInstance } from "fastify";
import { studentsRoutes } from "./students.route";

export const registerRoutes = (app: FastifyInstance) => {
  app.register(studentsRoutes);
};
