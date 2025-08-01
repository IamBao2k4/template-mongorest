import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { JWTGuard } from './guards/jwt.guard';
import { AuthRequestDto, AuthRequestValidation } from './dto/request.dto';
import { AuthResponseDto, AuthResponseHelper } from './dto/response.dto';
import { MODULE_VERSION, HttpError } from './types';

export interface AuthControllerDependencies {
  authService: AuthService;
  jwtGuard: JWTGuard;
  fastifyInstance: FastifyInstance;
}

export class AuthController {
  private authService: AuthService;
  private jwtGuard: JWTGuard;
  private app: FastifyInstance;

  constructor(dependencies: AuthControllerDependencies) {
    this.authService = dependencies.authService;
    this.jwtGuard = dependencies.jwtGuard;
    this.app = dependencies.fastifyInstance;
  }

  async register(app: FastifyInstance) {
    // Register route
    app.post('/auth/register', {
      schema: {
        body: AuthRequestDto.RegisterSchema.body,
        response: {
          201: AuthResponseDto.RegisterResponseSchema[200],
          ...AuthResponseDto.ErrorResponseSchema
        },
        tags: [`auth v${MODULE_VERSION}`],
        summary: 'Register new user'
      }
    }, async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const rawData = request.body as any;
        
        // Manual validation and transformation
        const validation = AuthRequestValidation.validateAndTransformRegisterData(rawData);
        if (!validation.valid) {
          return reply.code(400).send(
            AuthResponseHelper.error(validation.errors!.join(', '), 400, 'Bad Request')
          );
        }

        const result = await this.authService.register(validation.data!);
        
        return reply.code(201).send(
          AuthResponseHelper.success(result)
        );
      } catch (error) {
        return this.handleError(error, reply);
      }
    });

    // Login route - Hybrid approach (Passport or Manual)
    app.post('/auth/login', {
      preValidation: async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          if ((this.app as any).authenticateUser) {
            // Use Hybrid Auth Plugin
            await (this.app as any).authenticateUser(request, reply);
            console.log('✅ Hybrid authentication successful');
          } else {
            // Basic manual fallback
            const body = request.body as { email?: string; password?: string };
            
            if (!body.email || !body.password) {
              throw new Error('Email and password are required');
            }

            const user = await this.authService.validateCredentials(body.email, body.password);
            
            if (!user) {
              throw new Error('Invalid email or password');
            }

            request.user = user;
            console.log('✅ Basic manual authentication successful');
          }
        } catch (error: any) {
          return reply.code(401).send(
            AuthResponseHelper.error(error.message || 'Authentication failed', 401, 'Unauthorized')
          );
        }
      },
      schema: {
        body: AuthRequestDto.LoginSchema.body,
        querystring: {
          type: 'object',
          properties: {
            profile: { type: 'boolean', default: true }
          }
        },
        response: {
          200: AuthResponseDto.LoginResponseSchema[200],
          ...AuthResponseDto.ErrorResponseSchema
        },
        tags: [`auth v${MODULE_VERSION}`],
        summary: 'User login'
      }
    }, async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = request.user as any;
        const query = request.query as { profile?: boolean };
        const profile = query.profile !== undefined ? query.profile : true;

        console.log('Login successful for user:', user?.email, 'Profile requested:', profile);

        if (!user) {
          return reply.code(401).send(
            AuthResponseHelper.error('Authentication failed', 401, 'Unauthorized')
          );
        }

        // Generate JWT token using fastify-jwt
        const accessToken = this.app.jwt.sign({
          id: user._id?.toString() || user.id,
          email: user.email,
          username: user.username,
          phone: user.phone,
          role_system: user.role_system,
        });

        // Generate refresh token
        const jwtSign = this.app.jwt.sign.bind(this.app.jwt);
        const refreshToken = await this.authService.createRefreshToken(user, jwtSign);

        const result = {
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: {
            ...user,
            id: user._id?.toString() || user.id,
            password: undefined
          }
        };
        
        return reply.code(200).send(
          AuthResponseHelper.success(result)
        );
      } catch (error) {
        return this.handleError(error, reply);
      }
    });

    // Refresh token route
    app.post('/auth/refresh-token', {
      schema: {
        body: AuthRequestDto.RefreshTokenSchema.body,
        querystring: {
          type: 'object',
          properties: {
            profile: { type: 'boolean', default: true }
          }
        },
        response: {
          200: AuthResponseDto.LoginResponseSchema[200],
          ...AuthResponseDto.ErrorResponseSchema
        },
        tags: [`auth v${MODULE_VERSION}`],
        summary: 'Refresh access token'
      }
    }, async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const data = request.body as { refresh_token: string };
        const query = request.query as { profile?: boolean };
        const profile = query.profile !== undefined ? query.profile : true;

        if (!data.refresh_token || typeof data.refresh_token !== 'string') {
          return reply.code(400).send(
            AuthResponseHelper.error('Refresh token is required', 400, 'Bad Request')
          );
        }

        // Pass Fastify JWT functions to service
        const jwtSign = this.app.jwt.sign.bind(this.app.jwt);
        const jwtVerify = this.app.jwt.verify.bind(this.app.jwt);
        const result = await this.authService.getNewAccessToken(data.refresh_token, profile, jwtSign, jwtVerify);
        
        return reply.code(200).send(
          AuthResponseHelper.success(result)
        );
      } catch (error) {
        return this.handleError(error, reply);
      }
    });

    // Get account profile route (protected)
    app.get('/auth/me', {
      preHandler: this.jwtGuard.preHandler.bind(this.jwtGuard),
      schema: {
        headers: {
          type: 'object',
          properties: {
            authorization: { type: 'string' }
          },
          required: ['authorization']
        },
        response: {
          200: AuthResponseDto.GetAccountResponseSchema[200],
          ...AuthResponseDto.ErrorResponseSchema
        },
        tags: [`auth v${MODULE_VERSION}`],
        summary: 'Get current user profile',
        security: [{ bearerAuth: [] }]
      }
    }, async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = (request.headers as any).user;
        
        if (!user || !user.email) {
          return reply.code(401).send(
            AuthResponseHelper.error('Invalid user token', 401, 'Unauthorized')
          );
        }

        const result = await this.authService.getProfile(user.email);
        
        return reply.code(200).send(
          AuthResponseHelper.success(result)
        );
      } catch (error) {
        return this.handleError(error, reply);
      }
    });

    // Change tenant route (protected)
    app.get('/auth/change-tenant', {
      preHandler: this.jwtGuard.preHandler.bind(this.jwtGuard),
      schema: {
        headers: {
          type: 'object',
          properties: {
            authorization: { type: 'string' },
            'x-tenant-id': { type: 'string' }
          },
          required: ['authorization', 'x-tenant-id']
        },
        response: {
          200: AuthResponseDto.ChangeTenantResponseSchema[200],
          ...AuthResponseDto.ErrorResponseSchema
        },
        tags: [`auth v${MODULE_VERSION}`],
        summary: 'Change user tenant',
        security: [{ bearerAuth: [] }]
      }
    }, async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = (request.headers as any).user;
        const tenantId = request.headers['x-tenant-id'] as string;

        if (!user || !user.email) {
          return reply.code(401).send(
            AuthResponseHelper.error('Invalid user token', 401, 'Unauthorized')
          );
        }

        if (!tenantId) {
          return reply.code(400).send(
            AuthResponseHelper.error('x-tenant-id header is required', 400, 'Bad Request')
          );
        }

        // Pass Fastify JWT sign function to service
        const jwtSign = this.app.jwt.sign.bind(this.app.jwt);
        const result = await this.authService.changeTenant(user, tenantId, jwtSign);
        
        return reply.code(200).send(
          AuthResponseHelper.success(result)
        );
      } catch (error) {
        return this.handleError(error, reply);
      }
    });
  }

  private handleError(error: any, reply: FastifyReply) {
    console.error('Auth Controller Error:', error);

    if (error.statusCode) {
      // Custom HTTP error
      const httpError = error as HttpError;
      return reply.code(httpError.statusCode).send(
        AuthResponseHelper.error(httpError.message, httpError.statusCode, this.getErrorName(httpError.statusCode))
      );
    }

    // Default server error
    return reply.code(500).send(
      AuthResponseHelper.error('Internal Server Error', 500, 'Internal Server Error')
    );
  }

  private getErrorName(statusCode: number): string {
    const errorNames: { [key: number]: string } = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      500: 'Internal Server Error'
    };

    return errorNames[statusCode] || 'Error';
  }
}
