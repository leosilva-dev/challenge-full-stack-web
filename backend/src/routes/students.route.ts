import { FastifyInstance } from "fastify";
import { studentsController } from "../controllers/students/student.controller";

export const studentsRoutes = async (app: FastifyInstance) => {
  app.post("/students", studentsController.createStudent);
};
