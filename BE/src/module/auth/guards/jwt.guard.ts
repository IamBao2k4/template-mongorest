import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { JwtPayload } from '../types';

export class JWTGuard {
  private app: FastifyInstance;

  constructor(app: FastifyInstance) {
    this.app = app;
  }

  async canActivate(request: FastifyRequest, reply: FastifyReply): Promise<boolean> {
    try {
      const authorization = request.headers['authorization'] as string;
      if (!authorization) {
        return false;
      }

      const token = authorization.split(' ')[1];
      if (!token) {
        return false;
      }

      // Use Fastify JWT plugin to verify token
      const user: JwtPayload = this.app.jwt.verify(token);
      
      // Add user to request headers for access in controllers
      (request.headers as any).user = user;
      
      return true;
    } catch (error) {
      console.log('JWT Guard Error:', error);
      return false;
    }
  }

  // Decorator function for Fastify routes
  async preHandler(request: FastifyRequest, reply: FastifyReply) {
    const canAccess = await this.canActivate(request, reply);
    if (!canAccess) {
      reply.code(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Access token is required'
      });
    }
  }
}
