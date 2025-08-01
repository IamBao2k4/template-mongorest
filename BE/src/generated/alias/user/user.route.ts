import { FastifyInstance } from 'fastify';
import { UserController } from './user.controller';

export async function userRouter(fastify: FastifyInstance) {
  const controller = new UserController();

  fastify.post('/user', controller.create.bind(controller));
}