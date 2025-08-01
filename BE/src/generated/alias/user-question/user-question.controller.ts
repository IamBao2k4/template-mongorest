import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomUserQuestionService } from '../../customs/user-question/Customuser-question.service';

export class UserQuestionController {
  private service: CustomUserQuestionService;

  constructor() {
    this.service = new CustomUserQuestionService();
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