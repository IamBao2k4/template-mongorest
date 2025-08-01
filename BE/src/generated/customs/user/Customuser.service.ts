import { FastifyRequest } from 'fastify';
import { UserService } from '../../alias/user/user.service'

export class CustomUserService extends UserService {

  constructor() {
    super()
  }
}