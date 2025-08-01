import { FastifyRequest } from 'fastify';
import { PaymentMethodsService } from '../../alias/payment-methods/payment-methods.service'

export class CustomPaymentMethodsService extends PaymentMethodsService {

  constructor() {
    super()
  }
}