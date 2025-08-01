import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomTweetsGroupActivitiesService } from '../../customs/tweets-group-activities/Customtweets-group-activities.service';

export class TweetsGroupActivitiesController {
  private service: CustomTweetsGroupActivitiesService;

  constructor() {
    this.service = new CustomTweetsGroupActivitiesService();
  }

  async getList(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.getList(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }





  // Custom methods can be added here
}