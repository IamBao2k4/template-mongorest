import { FastifyRequest } from 'fastify';
import { UserProgressService } from '../../alias/user-progress/user-progress.service'

export class CustomUserProgressService extends UserProgressService {

  constructor() {
    super()
  }
}