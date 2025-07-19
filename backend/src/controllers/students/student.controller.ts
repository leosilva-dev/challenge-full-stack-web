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

const getAllStudents = async (req: FastifyRequest, reply: FastifyReply) => {
  const students = await studentService.getAllStudents();
  reply.code(200).send(students);
};

const getStudentById = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };
  const student = await studentService.getStudentById(id);
  reply.code(200).send(student);
};

const updateStudent = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };
  const bodyParsed = createStudentSchema.partial().parse(req.body);
  const student = await studentService.updateStudent(id, bodyParsed);
  reply.code(200).send(student);
};

const deleteStudent = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };
  await studentService.deleteStudent(id);
  reply.code(200).send({ message: "Student deleted successfully." });
};

export const studentsController = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
