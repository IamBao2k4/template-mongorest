import { FastifyRequest } from 'fastify';
import { PriceRuleService } from '../../alias/price-rule/price-rule.service'

export class CustomPriceRuleService extends PriceRuleService {

  constructor() {
    super()
  }
}