import { FastifyRequest } from 'fastify';
import { UserLearningPathService } from '../../alias/user-learning-path/user-learning-path.service'

export class CustomUserLearningPathService extends UserLearningPathService {

  constructor() {
    super()
  }
}