import * as bcrypt from 'bcrypt';
import { AuthRequestDto } from './dto/request.dto';
import { UserProfile, ROLE_SYSTEM, HttpError, LoginResponse, TokenResponse, RegisterResponse } from './types';
import { coreGlobal } from '../../configs/core-global';

export class AuthService {
  constructor() {
    console.log('AuthService initialized');
  }

  private createHttpError(message: string, statusCode: number): HttpError {
    const error = new Error(message) as HttpError;
    error.statusCode = statusCode;
    return error;
  }

  private checkCoreInitialized() {
    if (!coreGlobal || !coreGlobal.getCore) {
      throw this.createHttpError('Core system is not initialized', 500);
    }
  }

  async validateCredentials(email: string, password: string): Promise<UserProfile | null> {
    this.checkCoreInitialized();
    
    try {
      // Find user by email with password
      const userResult = await coreGlobal.getCore().findAll(
        { 
          and: `email=eq.${email}`,
          select: "*,role(),featured_image(),cover()",
          limit: '1'
        }, 
        'user'
      );

      if (!userResult.data || userResult.data.length === 0) {
        return null;
      }

      const user = userResult.data[0];

      // Verify password and active status
      if (!bcrypt.compareSync(password, user.password) || user.is_active === false) {
        return null;
      }

      // Get full profile for the user (remove password)
      const profile = await this.getProfile(email, true);
      return profile;
    } catch (error: any) {
      console.error('Error in validateCredentials:', error);
      return null;
    }
  }

  async getProfile(email: string, is_remove_password: boolean = true): Promise<UserProfile> {
    this.checkCoreInitialized();
    
    try {
      // Sử dụng coreGlobal để truy cập database thay vì mongoose models
      const userResult = await coreGlobal.getCore().findAll(
        { 
          email: `email=eq.${email}`,
          select: "*,role(),featured_image(),cover()",
          limit: '1'
        }, 
        'user'
      );


      if (!userResult.data || userResult.data.length === 0) {
        throw this.createHttpError('Account not found', 404);
      }

      let profile = userResult.data[0];

      if (is_remove_password) {
        profile.password = undefined;
      }

      let result = { ...profile } as any;

      if (profile.role_system === ROLE_SYSTEM.ADMIN) {
        // Load tenants and entities for admin
        try {
          const [tenantsResult, entitiesResult] = await Promise.all([
            coreGlobal.getCore().findAll({ select: "*" }, 'tenant'),
            coreGlobal.getCore().findAll({ select: "*" }, 'entity')
          ]);
          const tenants = tenantsResult.data || [];
          const entities = entitiesResult.data || [];

          let roles = tenants.map((tenant: any) => {
            return {
              title: tenant.title,
              description: tenant.description,
              permission: entities.map((entity: any) => {
                return {
                  title: entity.title,
                  entity: entity.mongodb_collection_name,
                  filter: ['get-all', 'get-all-self', 'get', 'get-self', 'post', 'put', 'put-self', 'delete'],
                  access_field: [],
                }
              }),
              tenant_id: tenant,
            }
          });
          result.role = roles;
        } catch (error) {
          console.warn('Failed to load tenant/entity data for admin:', error);
          result.role = [];
        }
      } else {
        // Load tenants and entities for regular user
        try {
          const [tenantsResult, entitiesResult] = await Promise.all([
            coreGlobal.getCore().findAll({ select: "*" }, 'tenant'),
            coreGlobal.getCore().findAll({ select: "*" }, 'entity')
          ]);

          const tenants = tenantsResult.data || [];
          const entities = entitiesResult.data || [];

          if (result.role && Array.isArray(result.role)) {
            let roles = result.role.map((role: any) => {
              let tenant = tenants.find((tenant: any) => tenant._id.toString() === role.tenant_id._id.toString());
              return {
                title: tenant?.title,
                permission: role.permission?.map((entity: any) => {
                  let entity_ = entities.find((entity_: any) => entity_.mongodb_collection_name === entity.entity);
                  return {
                    title: entity_ ? entity_.title : entity.entity,
                    entity: entity.entity,
                    filter: entity.filter,
                    access_field: entity.access_field,
                  }
                }) || [],
                tenant_id: tenant,
              }
            });
            result.role = roles;
          } else {
            result.role = [];
          }
        } catch (error) {
          console.warn('Failed to load tenant/entity data for user:', error);
          result.role = [];
        }
      }

      result.full_name = (result.first_name || '') + ' ' + (result.last_name || '');
      return result;
    } catch (error: any) {
      console.error('Error in getProfile:', error);
      if (error.statusCode) {
        throw error;
      }
      throw this.createHttpError('Failed to get user profile', 500);
    }
  }

  async login(email: string, password: string, profile: boolean, jwtSign: Function): Promise<LoginResponse> {
    this.checkCoreInitialized();
    
    try {
      let account = null;
      if (typeof profile === 'string') profile = profile === 'true' ? true : false;
      
      if (profile) {
        account = await this.getProfile(email, false);
      } else {
        const userResult = await coreGlobal.getCore().findOne(
          'user',
          {},
          [{
            field: "email",
            operator: "eq",
            value: email
          }]
          
        );

        if (userResult.data && userResult.data.length > 0) {
          account = userResult.data[0];
        }
      }

      if (!account) {
        throw this.createHttpError('Account not found', 404);
      }

      if (
        !bcrypt.compareSync(password, account.password) ||
        account.is_active === false
      ) {
        throw this.createHttpError('Account info is not valid', 400);
      }

      let accessToken = await jwtSign({
        id: account._id.toString(),
        email: account.email,
        username: account.username,
        phone: account.phone,
        role_system: account.role_system,
      });

      let refreshToken = await this.createRefreshToken(account, jwtSign);
      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: {
          ...JSON.parse(JSON.stringify(account)),
          id: account._id.toString(),
          email: account.email,
          username: account.username,
          phone: account.phone,
          role_system: account.role_system,
          role: account.role,
          password: undefined,
        },
      };
    } catch (error: any) {
      console.error('Error in login:', error);
      if (error.statusCode) {
        throw error;
      }
      throw this.createHttpError('Login failed', 500);
    }
  }

  async register(data: AuthRequestDto.RegisterDataDto): Promise<RegisterResponse> {
    this.checkCoreInitialized();
    
    try {
      // Check if user exists
      const existingUserResult = await coreGlobal.getCore().findAll(
        { 
          filters: `email=eq.${data.email}`,
          limit: '1'
        }, 
        'user'
      );

      if (existingUserResult.data && existingUserResult.data.length > 0) {
        throw this.createHttpError('User already exists', 400);
      }

      // Hash password
      const hashedData = {
        ...data,
        password: bcrypt.hashSync(data.password, 10),
        is_active: true, // Set default active status
        role_system: ROLE_SYSTEM.USER // Set default role
      };

      // Create user
      const result = await coreGlobal.getCore().create(
        'user',
        hashedData
      );

      if (result.data.length = 1) {
        result.data[0].password = "";
        return result.data[0];
      }

      return result.data[0];
    } catch (error: any) {
      console.error('Error in register:', error);
      if (error.statusCode) {
        throw error;
      }
      throw this.createHttpError('Registration failed', 500);
    }
  }

  async changeTenant(user: any, tenant_id: string, jwtSign: Function): Promise<string> {
    this.checkCoreInitialized();
    
    try {
      const userTenantResult = await coreGlobal.getCore().findAll(
        { 
          filters: `user=eq.${user.id},tenant_id=eq.${tenant_id}`,
          limit: '1'
        }, 
        'user_tenant_profile',
      );

      if (!userTenantResult.data || userTenantResult.data.length === 0) {
        throw this.createHttpError('User tenant profile not found', 404);
      }

      const user_tenant_profile = userTenantResult.data[0];

      let accessToken = await jwtSign({
        ...JSON.parse(JSON.stringify({ ...user, exp: undefined })),
        id_tenant: user_tenant_profile._id,
        profile_tenant: user_tenant_profile,
      }, {
        expiresIn: user.exp - Math.floor(Date.now() / 1000) - 400,
      });

      return accessToken;
    } catch (error: any) {
      console.error('Error in changeTenant:', error);
      if (error.statusCode) {
        throw error;
      }
      throw this.createHttpError('Change tenant failed', 500);
    }
  }

  async validateUserWithEntity(email: string, entity: string, id: string, tenant_id: string): Promise<any> {
    this.checkCoreInitialized();
    
    try {
      const userResult = await coreGlobal.getCore().findAll(
        { 
          filters: `email=eq.${email}`,
          select: "*,role()",
          limit: '1'
        }, 
        'user',
      );

      if (!userResult.data || userResult.data.length === 0) {
        throw this.createHttpError('Account not found', 404);
      }

      // check permission logic here
      return userResult.data[0];
    } catch (error: any) {
      console.error('Error in validateUserWithEntity:', error);
      if (error.statusCode) {
        throw error;
      }
      throw this.createHttpError('User validation failed', 500);
    }
  }

  async createRefreshToken(
    user: any,
    jwtSign: Function,
    expiresIn: string | number = '365d',
  ): Promise<string> {
    this.checkCoreInitialized();
    
    try {
      user.password = undefined;
      const options: any = { expiresIn };
      let token = await jwtSign(
        {
          _id: user._id.toString(),
          timestamp: Date.now(),
        },
        options
      );
      
      // Remove old refresh token
      try {
        const oldTokensResult = await coreGlobal.getCore().findAll(
          { 
            filters: `email=eq.${user.email.toString()},type=eq.refresh`
          }, 
          'user_token',
          
        );

        if (oldTokensResult.data && oldTokensResult.data.length > 0) {
          for (const tokenRecord of oldTokensResult.data) {
            await coreGlobal.getCore().delete(
              'user_token',
              tokenRecord._id.toString(),
            );
          }
        }
      } catch (deleteError) {
        console.warn('Failed to delete old refresh tokens:', deleteError);
      }

      // Create new refresh token
      await coreGlobal.getCore().create(
        'user_token',
        {
          email: user.email.toString(),
          token: token,
          type: 'refresh',
        }
      );

      return token;
    } catch (error) {
      console.error('Error in createRefreshToken:', error);
      throw this.createHttpError('Failed to create request token', 500);
    }
  }

  async getNewAccessToken(
    refreshToken: string,
    profile: boolean,
    jwtSign: Function,
    jwtVerify: Function
  ): Promise<TokenResponse> {
    this.checkCoreInitialized();
    
    try {
      const tokenResult = await coreGlobal.getCore().findAll(
        { 
          filters: `token=eq.${refreshToken}`,
          limit: '1'
        }, 
        'user_token'
      );

      if (!tokenResult.data || tokenResult.data.length === 0) {
        throw this.createHttpError('Token not found', 404);
      }

      const token = tokenResult.data[0];

      let decoded: any = null;
      try {
        decoded = await jwtVerify(token.token);
      } catch (error: any) {
        throw this.createHttpError(error.message || 'Invalid token', 400);
      }

      let account = null;
      if (typeof profile === 'string') profile = profile === 'true' ? true : false;
      
      if (profile) {
        account = await this.getProfile(token.email, false);
      } else {
        const userResult = await coreGlobal.getCore().findAll(
          { 
            filters: `email=eq.${token.email}`,
            limit: '1'
          }, 
          'user',
          
        );

        if (userResult.data && userResult.data.length > 0) {
          account = userResult.data[0];
        }
      }

      if (!account) {
        throw this.createHttpError('Account not found', 404);
      }

      let accessToken = await jwtSign({
        id: account._id.toString(),
        email: account.email,
        username: account.username,
        phone: account.phone,
        role_system: account.role_system,
      });

      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: {
          ...JSON.parse(JSON.stringify(account)),
          id: account._id.toString(),
          email: account.email,
          username: account.username,
          phone: account.phone,
          role_system: account.role_system,
          role: account.role,
          password: undefined,
        },
      };
    } catch (error: any) {
      console.error('Error in getNewAccessToken:', error);
      if (error.statusCode) {
        throw error;
      }
      throw this.createHttpError('Failed to refresh token', 500);
    }
  }
}
