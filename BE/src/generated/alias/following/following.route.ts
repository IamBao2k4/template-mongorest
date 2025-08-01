import { FastifyInstance } from 'fastify';
import { FollowingController } from './following.controller';

export async function followingRouter(fastify: FastifyInstance) {
  const controller = new FollowingController();

  fastify.get('/list/following', controller.getList.bind(controller));
}