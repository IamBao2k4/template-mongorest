# Auth Module - Fastify Implementation

Module xác thực được chuyển đổi từ NestJS sang Fastify, giữ nguyên logic code và service, sử dụng coreGlobal để truy cập database.

## Cấu trúc

```
auth/
├── auth.ts                 # Main module file với AuthRoutes function
├── auth.controller.ts      # Controller xử lý các routes
├── auth.service.ts         # Service xử lý logic business (sử dụng coreGlobal)
├── types.ts               # Interfaces, types và constants chung
├── index.ts               # Export module
├── dto/
│   ├── request.dto.ts     # Request DTOs và validation schemas
│   └── response.dto.ts    # Response DTOs và schemas
├── guards/
│   ├── jwt.guard.ts       # JWT authentication guard
│   ├── jwt-nullable.guard.ts # Optional JWT guard
│   ├── admin.guard.ts     # Admin role guard
│   └── permission.guard.ts # Permission-based guard
└── README.md
```

## Sử dụng

### 1. Import và khởi tạo module

```typescript
import { FastifyInstance } from 'fastify';
import { AuthRoutes } from './module/auth';

// Đăng ký routes - module tự động sử dụng coreGlobal
async function registerAuthModule(app: FastifyInstance) {
  const authModule = await AuthRoutes(app);
  
  // Có thể sử dụng các instances exported
  const { jwtGuard, adminGuard, permissionGuard, authService } = authModule;
  
  return authModule;
}
```

### 2. API Endpoints

#### POST /v1/auth/register
Đăng ký tài khoản mới

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "phone": "+84999999999",
  "password": "Password123!"
}
```

#### POST /v1/auth/login
Đăng nhập

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Query Parameters:**
- `profile` (boolean, default: true) - Include user profile in response

#### POST /v1/auth/refresh-token
Làm mới access token

**Request Body:**
```json
{
  "refresh_token": "your_refresh_token"
}
```

#### GET /v1/auth/me
Lấy thông tin profile người dùng hiện tại (cần authentication)

**Headers:**
- `Authorization: Bearer <access_token>`

#### GET /v1/auth/change-tenant
Đổi tenant (cần authentication)

**Headers:**
- `Authorization: Bearer <access_token>`
- `x-tenant-id: <tenant_id>`

### 3. Sử dụng Guards trong các routes khác

```typescript
import { JWTGuard, AdminGuard, PermissionGuard } from './module/auth';

// Lấy guards từ authModule
const authModule = await AuthRoutes(app);
const { jwtGuard, adminGuard, permissionGuard } = authModule;

// Trong routes khác
app.get('/protected-route', {
  preHandler: jwtGuard.preHandler.bind(jwtGuard)
}, async (request, reply) => {
  // Route được bảo vệ bởi JWT
  const user = (request.headers as any).user;
  // ...
});

app.get('/admin-only', {
  preHandler: adminGuard.preHandler.bind(adminGuard)
}, async (request, reply) => {
  // Chỉ admin mới truy cập được
  // ...
});

app.get('/permission-based', {
  preHandler: permissionGuard.createPreHandler(['get', 'read'])
}, async (request, reply) => {
  // Cần permission cụ thể
  // ...
});
```

### 4. Error Handling

Module tự động xử lý lỗi và trả về chuẩn:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Error message"
}
```

## Thay đổi so với NestJS

1. **Dependencies**: Không cần inject dependencies, sử dụng `coreGlobal` trực tiếp
2. **Database Access**: Sử dụng `coreGlobal.getCore()` thay vì mongoose models
3. **JWT Handling**: Sử dụng Fastify JWT plugin thay vì NestJS JWT service
4. **Decorators → Fastify Schemas**: Validation chuyển từ class-validator decorators sang Fastify schemas
5. **Guards → preHandler**: Guards trở thành preHandler functions
6. **Exception Filters → Error Handling**: Lỗi được xử lý trong controller methods

## Database Operations

Module sử dụng coreGlobal để truy cập database:

```typescript
// Find all users
const usersResult = await coreGlobal.getCore().findAll(
  { 
    filters: { email: email },
    select: "*,role(),featured_image()",
    limit: 1
  }, 
  'user',
  ['default'],
  'mongodb'
);

// Create new user
const result = await coreGlobal.getCore().create(
  'user',
  userData,
  ['default'],
  'mongodb'
);

// Delete records
await coreGlobal.getCore().delete(
  'user_token',
  tokenId,
  ['default'],
  'mongodb'
);
```

## JWT Integration

Module tích hợp với Fastify JWT plugin:

```typescript
// Trong service methods
const accessToken = await jwtSign({
  id: user._id.toString(),
  email: user.email,
  username: user.username,
  phone: user.phone,
  role_system: user.role_system,
});

// Trong guards
const user: JwtPayload = this.app.jwt.verify(token);
```

## Security Features

- JWT tokens được verify qua Fastify JWT plugin
- Password được hash với bcrypt
- Refresh tokens được lưu trong database thông qua coreGlobal
- Role-based và permission-based access control
- Admin guard cho các routes yêu cầu quyền admin
- Permission guard có thể kiểm tra quyền chi tiết

## Collections Used

Module sử dụng các collections sau thông qua coreGlobal:
- `user` - Thông tin người dùng
- `user_token` - Refresh tokens
- `role` - Vai trò người dùng
- `tenant` - Tenant information
- `entity` - Entity definitions
- `user_tenant_profile` - User tenant relationships

## Validation

Validation được thực hiện qua:
1. Fastify schemas (automatic)
2. Manual validation trong controller (cho các rule phức tạp)
3. AuthRequestValidation class (helper functions)

Tất cả validation rules được giữ nguyên từ code NestJS gốc.
