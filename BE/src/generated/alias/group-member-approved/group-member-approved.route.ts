import { FastifyInstance } from 'fastify';
import { GroupMemberApprovedController } from './group-member-approved.controller';

export async function groupMemberApprovedRouter(fastify: FastifyInstance) {
  const controller = new GroupMemberApprovedController();

  fastify.put('/group-member-approved/:id', controller.update.bind(controller));
}