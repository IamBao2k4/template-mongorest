import { FastifyInstance } from 'fastify';
import { SocialAddMemberController } from './social-add-member.controller';

export async function socialAddMemberRouter(fastify: FastifyInstance) {
  const controller = new SocialAddMemberController();

  fastify.get('/list/social-add-member', controller.getList.bind(controller));
}