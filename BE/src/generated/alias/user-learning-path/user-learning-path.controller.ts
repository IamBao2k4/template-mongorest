import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomUserLearningPathService } from '../../customs/user-learning-path/Customuser-learning-path.service';

export class UserLearningPathController {
  private service: CustomUserLearningPathService;

  constructor() {
    this.service = new CustomUserLearningPathService();
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