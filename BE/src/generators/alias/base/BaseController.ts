export abstract class BaseController {
  constructor() {
    // Base controller initialization
  }

  protected handleError(error: any): { message: string; status: number } {
    console.error('Controller error:', error);
    
    if (error.name === 'ValidationError') {
      return {
        message: error.message || 'Validation failed',
        status: 400
      };
    }

    if (error.name === 'NotFoundError') {
      return {
        message: error.message || 'Resource not found',
        status: 404
      };
    }

    return {
      message: error.message || 'Internal server error',
      status: 500
    };
  }
}