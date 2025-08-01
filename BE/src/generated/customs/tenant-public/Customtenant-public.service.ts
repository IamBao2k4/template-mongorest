import { FastifyRequest } from 'fastify';
import { TenantPublicService } from '../../alias/tenant-public/tenant-public.service'

export class CustomTenantPublicService extends TenantPublicService {

  constructor() {
    super()
  }
}