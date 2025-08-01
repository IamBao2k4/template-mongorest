import { FastifyRequest } from 'fastify';
import { UserQuestionService } from '../../alias/user-question/user-question.service'

export class CustomUserQuestionService extends UserQuestionService {

  constructor() {
    super()
  }

}