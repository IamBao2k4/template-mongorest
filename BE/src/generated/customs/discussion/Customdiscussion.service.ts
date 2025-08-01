import { FastifyRequest } from 'fastify';
import { DiscussionService } from '../../alias/discussion/discussion.service'

export class CustomDiscussionService extends DiscussionService {

  constructor() {
    super()
  }
}