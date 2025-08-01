import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomGroupSettingService } from '../../customs/group-setting/Customgroup-setting.service';

export class GroupSettingController {
  private service: CustomGroupSettingService;

  constructor() {
    this.service = new CustomGroupSettingService();
  }




  async update(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.service.update(request);
      reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  }


  // Custom methods can be added here
}