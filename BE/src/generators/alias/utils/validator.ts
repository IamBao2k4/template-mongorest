import { Request } from 'express';
import { loadValidateFile } from './jsonLoader';

interface ValidationResult {
  valid: boolean;
  message?: string;
  errors?: any[];
}

interface ValidationRule {
  notification: any;
  response: any;
  query_validate: any;
  list_validate: any[];
  custom_filter: any;
}

export async function validateRequest(
  req: Request, 
  validationRules: ValidationRule[]
): Promise<ValidationResult> {
  try {
    // Process each validation rule
    for (const rule of validationRules) {
      // Load and check validate files
      if (rule.list_validate && rule.list_validate.length > 0) {
        for (const validate of rule.list_validate) {
          const validateData = await loadValidateFile(validate._id);
          
          // Here you would implement the actual validation logic
          // based on the validate data structure
          // This is a placeholder implementation
          const isValid = await performValidation(req, validateData);
          
          if (!isValid) {
            return {
              valid: false,
              message: `Validation failed: ${validate.title}`
            };
          }
        }
      }

      // Check query_validate rules
      if (rule.query_validate && rule.query_validate.rules) {
        const queryValidResult = await validateQueryRules(req, rule.query_validate);
        if (!queryValidResult.valid) {
          return queryValidResult;
        }
      }
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      message: 'Validation error',
      errors: [error]
    };
  }
}

async function performValidation(req: Request, validateData: any): Promise<boolean> {
  // This is a placeholder for actual validation logic
  // You would implement the specific validation based on your requirements
  
  // Example: Check if user is active
  if (validateData.title === 'is-user-active') {
    // Check user status from request context
    const user = (req as any).user;
    return user && user.active === true;
  }

  // Add more validation logic as needed
  return true;
}

async function validateQueryRules(req: Request, queryValidate: any): Promise<ValidationResult> {
  const { combinator, rules } = queryValidate;
  
  if (!rules || rules.length === 0) {
    return { valid: true };
  }

  const results: boolean[] = [];

  for (const rule of rules) {
    if (rule.rules) {
      // Nested rules
      const nestedResult = await validateQueryRules(req, rule);
      results.push(nestedResult.valid);
    } else {
      // Simple rule
      const isValid = await evaluateRule(req, rule);
      results.push(isValid);
    }
  }

  // Apply combinator logic
  let isValid = false;
  if (combinator === 'and') {
    isValid = results.every(r => r === true);
  } else if (combinator === 'or') {
    isValid = results.some(r => r === true);
  }

  return {
    valid: isValid,
    message: isValid ? undefined : 'Query validation failed'
  };
}

async function evaluateRule(req: Request, rule: any): Promise<boolean> {
  const { field, operator, value } = rule;
  
  // Get the actual value from request
  let actualValue: any;
  if (field === 'data') {
    // This might refer to request data or a specific field
    actualValue = req.body?.data || req.query?.data;
  } else {
    actualValue = req.body?.[field] || req.query?.[field] || req.params?.[field];
  }

  // Evaluate based on operator
  switch (operator) {
    case '=':
    case '==':
      return actualValue == value;
    case '!=':
      return actualValue != value;
    case '>':
      return actualValue > value;
    case '<':
      return actualValue < value;
    case '>=':
      return actualValue >= value;
    case '<=':
      return actualValue <= value;
    default:
      return false;
  }
}