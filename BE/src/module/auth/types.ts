// Common interfaces and types for Auth module

export interface JwtPayload {
  id: string;
  email: string;
  username: string;
  phone: string;
  role_system: string;
  exp?: number;
  iat?: number;
  id_tenant?: string;
  profile_tenant?: any;
}

export interface UserProfile {
  _id: any;
  email: string;
  username?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  role_system: string;
  role?: any[];
  featured_image?: any;
  cover?: any;
  password?: string;
  is_active?: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

export interface RegisterResponse {
  _id: any;
  email: string;
  username: string;
  phone: string;
  created_at?: Date;
  updated_at?: Date;
}

// HTTP Exception interface for Fastify
export interface HttpError extends Error {
  statusCode: number;
  message: string;
}

// Enum for role system
export enum ROLE_SYSTEM {
  ADMIN = 'admin',
  USER = 'user'
}

// Version configuration
export const MODULE_VERSION = 'v1';

// Response wrapper interface
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  statusCode: number;
}
