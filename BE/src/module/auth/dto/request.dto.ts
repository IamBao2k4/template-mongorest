// Request DTOs for Auth module
// Note: Validation will be handled by Fastify schema

export namespace AuthRequestDto {
    export interface LoginLocalDataDto {
        email: string;
        password: string;
    }

    export interface PasswordDto {
        value: string;
    }

    export interface PayloadTokenDto {
        id: string;
        email: string;
        username: string;
        phone: string;
        role: string;
        exp?: any;
    }

    export interface RegisterDataDto {
        email: string;
        username: string;
        phone: string;
        password: string;
    }

    // Validation schemas for Fastify
    export const LoginSchema = {
        body: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: { 
                    type: 'string', 
                    format: 'email'
                },
                password: { 
                    type: 'string',
                    minLength: 1
                }
            }
        }
    };

    export const RegisterSchema = {
        body: {
            type: 'object',
            required: ['email', 'username', 'phone', 'password'],
            properties: {
                email: { 
                    type: 'string',
                    format: 'email'
                },
                username: { 
                    type: 'string',
                    minLength: 4,
                    maxLength: 20
                },
                phone: { 
                    type: 'string',
                    pattern: '^[+]?[0-9]{10,15}$'
                },
                password: { 
                    type: 'string',
                    minLength: 8,
                    maxLength: 20,
                    pattern: '^(?=.*[a-z])(?=.*\\d)(?=.*[\\W_])(?!.*\\s).{8,}$'
                }
            }
        }
    };

    export const RefreshTokenSchema = {
        body: {
            type: 'object',
            required: ['refresh_token'],
            properties: {
                refresh_token: { type: 'string' }
            }
        }
    };
}

// Validation functions for manual validation and transformation
export class AuthRequestValidation {
    static validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validatePassword(password: string): { valid: boolean; message?: string } {
        if (password.length < 8 || password.length > 20) {
            return { 
                valid: false, 
                message: 'Password must be between 8 and 20 characters' 
            };
        }

        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[\W_]/.test(password);
        const hasSpace = /\s/.test(password);

        if (!hasLowercase || !hasNumber || !hasSpecialChar || hasSpace) {
            return { 
                valid: false, 
                message: 'Password must contain at least 1 lowercase letter, 1 number, 1 special character, and no spaces' 
            };
        }

        return { valid: true };
    }

    static validatePhone(phone: string): boolean {
        const phoneRegex = /^[+]?[0-9]{10,15}$/;
        return phoneRegex.test(phone);
    }

    static validateUsername(username: string): { valid: boolean; message?: string } {
        if (username.length < 4 || username.length > 20) {
            return { 
                valid: false, 
                message: 'Username must be between 4 and 20 characters' 
            };
        }
        return { valid: true };
    }

    // Transform functions to handle data transformation manually
    static transformEmail(email: string): string {
        return email.toLowerCase().trim();
    }

    static sanitizeInput(input: string): string {
        return input.trim();
    }

    // Validate and transform request data
    static validateAndTransformLoginData(data: any): { valid: boolean; data?: AuthRequestDto.LoginLocalDataDto; errors?: string[] } {
        const errors: string[] = [];
        
        if (!data.email) {
            errors.push('Email is required');
        } else if (!this.validateEmail(data.email)) {
            errors.push('Invalid email format');
        }

        if (!data.password) {
            errors.push('Password is required');
        }

        if (errors.length > 0) {
            return { valid: false, errors };
        }

        return {
            valid: true,
            data: {
                email: this.transformEmail(data.email),
                password: data.password
            }
        };
    }

    static validateAndTransformRegisterData(data: any): { valid: boolean; data?: AuthRequestDto.RegisterDataDto; errors?: string[] } {
        const errors: string[] = [];
        
        if (!data.email) {
            errors.push('Email is required');
        } else if (!this.validateEmail(data.email)) {
            errors.push('Invalid email format');
        }

        if (!data.username) {
            errors.push('Username is required');
        } else {
            const usernameValidation = this.validateUsername(data.username);
            if (!usernameValidation.valid) {
                errors.push(usernameValidation.message!);
            }
        }

        if (!data.phone) {
            errors.push('Phone is required');
        } else if (!this.validatePhone(data.phone)) {
            errors.push('Invalid phone format');
        }

        if (!data.password) {
            errors.push('Password is required');
        } else {
            const passwordValidation = this.validatePassword(data.password);
            if (!passwordValidation.valid) {
                errors.push(passwordValidation.message!);
            }
        }

        if (errors.length > 0) {
            return { valid: false, errors };
        }

        return {
            valid: true,
            data: {
                email: this.transformEmail(data.email),
                username: this.sanitizeInput(data.username),
                phone: this.sanitizeInput(data.phone),
                password: data.password
            }
        };
    }
}
