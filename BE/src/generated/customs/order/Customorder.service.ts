import { FastifyRequest } from 'fastify';
import { OrderService } from '../../alias/order/order.service'

export class CustomOrderService extends OrderService {

  constructor() {
    super()
  }
}