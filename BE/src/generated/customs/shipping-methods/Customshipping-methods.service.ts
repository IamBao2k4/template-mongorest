import { FastifyRequest } from 'fastify';
import { ShippingMethodsService } from '../../alias/shipping-methods/shipping-methods.service'

export class CustomShippingMethodsService extends ShippingMethodsService {

  constructor() {
    super()
  }
}