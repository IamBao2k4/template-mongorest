import { FastifyRequest } from 'fastify';
import { LearningPathService } from '../../alias/learning-path/learning-path.service'

export class CustomLearningPathService extends LearningPathService {

  constructor() {
    super()
  }
}