import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomSocialAddMemberService } from '../../customs/social-add-member/Customsocial-add-member.service';

export class SocialAddMemberController {
  private service: CustomSocialAddMemberService;

  constructor() {
    this.service = new CustomSocialAddMemberService();
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