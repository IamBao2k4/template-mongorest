import { FastifyInstance } from 'fastify';
import { CommonRoutes } from '../module/common/common';
import { AuthRoutes } from '../module/auth/auth';

export async function IndexRoute(app: FastifyInstance) {
  
  await AuthRoutes(app);
  // await EntityRoutes(app);
  console.log(8)
  await CommonRoutes(app);
}