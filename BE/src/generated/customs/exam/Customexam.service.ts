import { FastifyRequest } from 'fastify';
import { ExamService } from '../../alias/exam/exam.service'

export class CustomExamService extends ExamService {

  constructor() {
    super()
  }
}