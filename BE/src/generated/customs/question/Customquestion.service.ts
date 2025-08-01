import { FastifyRequest } from 'fastify';
import { QuestionService } from '../../alias/question/question.service'

export class CustomQuestionService extends QuestionService {

  constructor() {
    super()
  }
}