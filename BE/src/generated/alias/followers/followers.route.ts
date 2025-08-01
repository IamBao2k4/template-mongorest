import { FastifyInstance } from 'fastify';
import { FollowersController } from './followers.controller';

export async function followersRouter(fastify: FastifyInstance) {
  const controller = new FollowersController();

  fastify.get('/list/followers', controller.getList.bind(controller));
}