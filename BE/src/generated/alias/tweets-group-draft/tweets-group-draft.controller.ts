import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomTweetsGroupDraftService } from '../../customs/tweets-group-draft/Customtweets-group-draft.service';

export class TweetsGroupDraftController {
  private service: CustomTweetsGroupDraftService;

  constructor() {
    this.service = new CustomTweetsGroupDraftService();
  }



  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.create(request);
      reply.code(201).send(result);
    } catch (error) {
      reply.send(error);
    }
  }





  async update(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.update(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }


  // Custom methods can be added here
}