// Response DTOs and schemas for Auth module

export namespace AuthResponseDto {
  export interface RegisterResponseDto {
    data: {
      email: string;
      username: string;
      phone: string;
      deletedAt: Date | null;
      id: string;
      created_at: Date;
      updated_at: Date;
      role: string;
    };
    message: string;
    statusCode: number;
  }

  export interface LoginResponseDto {
    data: {
      accessToken: string;
      refreshToken: string;
      user: {
        id: string;
        email: string;
        username: string;
        phone: string;
        role_system: string;
        role: any[];
        full_name?: string;
        first_name?: string;
        last_name?: string;
        featured_image?: any;
        cover?: any;
      };
    };
    message: string;
    statusCode: number;
  }

  export interface GetAccountResponseDto {
    data: {
      id: string;
      email: string;
      username: string;
      phone: string;
      role_system: string;
      role: any[];
      full_name: string;
      first_name?: string;
      last_name?: string;
      featured_image?: any;
      cover?: any;
      created_at: Date;
      updated_at: Date;
      deletedAt: Date | null;
    };
    message: string;
    statusCode: number;
  }

  export interface UpdateAccountResponseDto {
    data: {
      generatedMaps: any[];
      raw: any[];
      affected: number;
    };
    message: string;
    statusCode: number;
  }

  export interface ChangeTenantResponseDto {
    data: string; // JWT token
    message: string;
    statusCode: number;
  }

  // Fastify response schemas
  export const RegisterResponseSchema = {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            username: { type: 'string' },
            phone: { type: 'string' },
            deletedAt: { type: ['string', 'null'] },
            id: { type: 'string' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' },
            role: { type: 'string' }
          }
        },
        message: { type: 'string' },
        statusCode: { type: 'number' }
      }
    }
  };

  export const LoginResponseSchema = {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                username: { type: 'string' },
                phone: { type: 'string' },
                role_system: { type: 'string' },
                role: { type: 'array' },
                full_name: { type: 'string' },
                first_name: { type: 'string' },
                last_name: { type: 'string' },
                featured_image: {},
                cover: {}
              }
            }
          }
        },
        message: { type: 'string' },
        statusCode: { type: 'number' }
      }
    }
  };

  export const GetAccountResponseSchema = {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            username: { type: 'string' },
            phone: { type: 'string' },
            role_system: { type: 'string' },
            role: { type: 'array' },
            full_name: { type: 'string' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            featured_image: {},
            cover: {},
            created_at: { type: 'string' },
            updated_at: { type: 'string' },
            deletedAt: { type: ['string', 'null'] }
          }
        },
        message: { type: 'string' },
        statusCode: { type: 'number' }
      }
    }
  };

  export const ChangeTenantResponseSchema = {
    200: {
      type: 'object',
      properties: {
        data: { type: 'string' },
        message: { type: 'string' },
        statusCode: { type: 'number' }
      }
    }
  };

  // Error response schema
  export const ErrorResponseSchema = {
    400: {
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' }
      }
    },
    401: {
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' }
      }
    },
    403: {
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' }
      }
    },
    404: {
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' }
      }
    },
    500: {
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' }
      }
    }
  };
}

// Helper function to format responses
export class AuthResponseHelper {
  static success<T>(data: T, message: string = 'Success', statusCode: number = 200) {
    return {
      data,
      message,
      statusCode
    };
  }

  static error(message: string, statusCode: number, error: string = 'Error') {
    return {
      statusCode,
      error,
      message
    };
  }
}
