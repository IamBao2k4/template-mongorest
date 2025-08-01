import { FastifyRequest } from 'fastify';
import { UserTenantProfileService } from '../../alias/user-tenant-profile/user-tenant-profile.service'

export class CustomUserTenantProfileService extends UserTenantProfileService {

  constructor() {
    super()
  }
}