import { FastifyInstance } from 'fastify';
import { LeaveGroupController } from './leave-group.controller';

export async function leaveGroupRouter(fastify: FastifyInstance) {
  const controller = new LeaveGroupController();

  fastify.put('/leave-group/:id', controller.update.bind(controller));
}