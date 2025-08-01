import { FastifyRequest } from 'fastify';
import { UserTimeLearningService } from '../../alias/user-time-learning/user-time-learning.service'

export class CustomUserTimeLearningService extends UserTimeLearningService {

  constructor() {
    super()
  }
}