import { FastifyInstance } from 'fastify';
import { TweetsGroupActivitiesController } from './tweets-group-activities.controller';

export async function tweetsGroupActivitiesRouter(fastify: FastifyInstance) {
  const controller = new TweetsGroupActivitiesController();

  fastify.get('/list/tweets-group-activities', controller.getList.bind(controller));
}