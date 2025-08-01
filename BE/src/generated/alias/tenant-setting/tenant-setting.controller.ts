import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomTenantSettingService } from '../../customs/tenant-setting/Customtenant-setting.service';

export class TenantSettingController {
  private service: CustomTenantSettingService;

  constructor() {
    this.service = new CustomTenantSettingService();
  }

  async getList(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.getList(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }





  // Custom methods can be added here
}