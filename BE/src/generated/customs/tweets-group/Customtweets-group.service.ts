import { FastifyRequest } from 'fastify';
import { TweetsGroupService } from '../../alias/tweets-group/tweets-group.service'

export class CustomTweetsGroupService extends TweetsGroupService {

  constructor() {
    super()
  }
}