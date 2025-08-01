import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomCategoriesService } from '../../customs/categories/Customcategories.service';

export class CategoriesController {
  private service: CustomCategoriesService;

  constructor() {
    this.service = new CustomCategoriesService();
  }

  async getList(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.getList(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }





  async getDetail(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.getDetail(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }




  // Custom methods can be added here
}