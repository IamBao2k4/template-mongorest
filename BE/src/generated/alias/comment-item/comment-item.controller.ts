import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomCommentItemService } from '../../customs/comment-item/Customcomment-item.service';

export class CommentItemController {
  private service: CustomCommentItemService;

  constructor() {
    this.service = new CustomCommentItemService();
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