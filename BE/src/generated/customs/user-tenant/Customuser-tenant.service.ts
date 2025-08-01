import { FastifyRequest } from 'fastify';
import { UserTenantService } from '../../alias/user-tenant/user-tenant.service'

export class CustomUserTenantService extends UserTenantService {

  constructor() {
    super()
  }
}