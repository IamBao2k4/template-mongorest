// Main auth module exports
export * from './auth';
export * from './auth.service';
export * from './auth.controller';
export * from './types';

// DTOs
export * from './dto/request.dto';
export * from './dto/response.dto';

// Guards
export * from './guards/jwt.guard';
export * from './guards/jwt-nullable.guard';
export * from './guards/admin.guard';
export * from './guards/permission.guard';

// Re-export main function and types
export { AuthRoutes } from './auth';
// export type { AuthModuleDependencies } from './types';
