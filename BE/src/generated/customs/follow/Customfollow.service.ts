import { FastifyRequest } from 'fastify';
import { FollowService } from '../../alias/follow/follow.service'

export class CustomFollowService extends FollowService {

  constructor() {
    super()
  }
}