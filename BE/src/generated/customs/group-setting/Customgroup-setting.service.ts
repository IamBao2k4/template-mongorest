import { FastifyRequest } from 'fastify';
import { GroupSettingService } from '../../alias/group-setting/group-setting.service'

export class CustomGroupSettingService extends GroupSettingService {

  constructor() {
    super()
  }
}