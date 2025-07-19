import { FastifyReply, FastifyRequest } from "fastify";
import { StudentRepository } from "../../repository/students/student.repository";
import { StudentService } from "../../services/students/student.service";
import { createStudentSchema } from "../../validation-schemas/student.schema";

const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);

const createStudent = async (req: FastifyRequest, reply: FastifyReply) => {
  const bodyParsed = createStudentSchema.parse(req.body);
  const student = await studentService.createStudent(bodyParsed);
  reply.code(201).send(student);
};

export const studentsController = {
  createStudent,
};
