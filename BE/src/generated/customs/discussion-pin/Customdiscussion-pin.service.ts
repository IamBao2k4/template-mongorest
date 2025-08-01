import { FastifyRequest } from 'fastify';
import { DiscussionPinService } from '../../alias/discussion-pin/discussion-pin.service'

export class CustomDiscussionPinService extends DiscussionPinService {

  constructor() {
    super()
  }
}