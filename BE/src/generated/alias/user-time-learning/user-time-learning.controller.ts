import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomUserTimeLearningService } from '../../customs/user-time-learning/Customuser-time-learning.service';

export class UserTimeLearningController {
  private service: CustomUserTimeLearningService;

  constructor() {
    this.service = new CustomUserTimeLearningService();
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