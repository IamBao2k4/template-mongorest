import { FastifyInstance } from 'fastify';
import { TransferOwnerGroupController } from './transfer-owner-group.controller';

export async function transferOwnerGroupRouter(fastify: FastifyInstance) {
  const controller = new TransferOwnerGroupController();

  fastify.put('/transfer-owner-group/:id', controller.update.bind(controller));
}