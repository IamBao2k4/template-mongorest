import { FastifyRequest } from 'fastify';
import { CouponService } from '../../alias/coupon/coupon.service'

export class CustomCouponService extends CouponService {

  constructor() {
    super()
  }
}