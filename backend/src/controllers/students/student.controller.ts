import { FastifyReply, FastifyRequest } from 'fastify';
import { StudentRepository } from '../../repository/students/student.repository';
import { StudentService } from '../../services/students/student.service';
import { createStudentSchema } from '../../validation-schemas/student.schema';
import { sendOkResponse, sendCreated, sendNotFound } from '../../helpers/httpResponse';
import { IGetAllStudentsDTO } from '../../dtos/student.dto';

const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);

const createStudent = async (req: FastifyRequest, reply: FastifyReply) => {
  const bodyParsed = createStudentSchema.parse(req.body);
  const student = await studentService.createStudent(bodyParsed);
  sendCreated(reply, student);
};

const getAllStudents = async (req: FastifyRequest, reply: FastifyReply) => {
  const query = req.query as IGetAllStudentsDTO;
  const params = {
    page: query.page ? parseInt(query.page.toString()) : undefined,
    limit: query.limit ? parseInt(query.limit.toString()) : undefined,
    search: query.search || undefined,
  };
  const students = await studentService.getAllStudents(params);
  sendOkResponse(reply, students);
};

const getStudentById = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };
  const student = await studentService.getStudentById(id);
  if (!student) {
    return sendNotFound(reply, 'Student not found');
  }
  sendOkResponse(reply, student);
};

const updateStudent = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };
  const bodyParsed = createStudentSchema.partial().parse(req.body);
  const student = await studentService.updateStudent(id, bodyParsed);
  sendOkResponse(reply, student);
};

const deleteStudent = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };
  await studentService.deleteStudent(id);
  sendOkResponse(reply, { message: 'Student deleted successfully.' });
};

export const studentsController = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
