import { FastifyRequest } from 'fastify';
import { PriceRulesService } from '../../alias/price-rules/price-rules.service'

export class CustomPriceRulesService extends PriceRulesService {

  constructor() {
    super()
  }
}