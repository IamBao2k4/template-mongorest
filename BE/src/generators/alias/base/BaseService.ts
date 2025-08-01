export abstract class BaseService {
  constructor() {
    // Base service initialization
  }

  protected async executeWithRetry<T>(
    operation: () => Promise<T>,
    retries: number = 3
  ): Promise<T> {
    let lastError: any;
    
    for (let i = 0; i < retries; i++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        if (i < retries - 1) {
          await this.delay(1000 * (i + 1)); // Exponential backoff
        }
      }
    }
    
    throw lastError;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}