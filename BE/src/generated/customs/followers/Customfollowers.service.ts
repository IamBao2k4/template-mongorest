import { FastifyRequest } from 'fastify';
import { FollowersService } from '../../alias/followers/followers.service'

export class CustomFollowersService extends FollowersService {

  constructor() {
    super()
  }
}