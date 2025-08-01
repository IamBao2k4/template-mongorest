import { FastifyInstance } from 'fastify';
import { SocialGroupCategoriesController } from './social-group-categories.controller';

export async function socialGroupCategoriesRouter(fastify: FastifyInstance) {
  const controller = new SocialGroupCategoriesController();

  fastify.get('/social-group-categories/:id', controller.getDetail.bind(controller));
}