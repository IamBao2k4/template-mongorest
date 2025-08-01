import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomPriceRulesService } from '../../customs/price-rules/Customprice-rules.service';

export class PriceRulesController {
  private service: CustomPriceRulesService;

  constructor() {
    this.service = new CustomPriceRulesService();
  }







  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.create(request);
      reply.code(201).send(result);
    } catch (error) {
      reply.send(error);
    }
  }



  // Custom methods can be added here
}