import { FastifyRequest } from 'fastify';
import { TenantSettingService } from '../../alias/tenant-setting/tenant-setting.service'

export class CustomTenantSettingService extends TenantSettingService {

  constructor() {
    super()
  }
}