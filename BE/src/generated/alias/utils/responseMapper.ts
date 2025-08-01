export interface RequestContext {
  params: any;
  query: any;
  body: any;
  headers: any;
}

export class ResponseMapper {
  
  /**
   * Map response config by replacing placeholders with actual values
   * @param responseConfig - The response configuration object
   * @param context - Request context containing params, query, body, headers
   * @returns Mapped response config with placeholders replaced
   */
  mapResponse(responseConfig: any, context: RequestContext): any {
    if (!responseConfig) {
      return responseConfig;
    }

    // Deep clone to avoid modifying original
    const mappedConfig = JSON.parse(JSON.stringify(responseConfig));
    
    // Recursively process the config
    return this.processValue(mappedConfig, context);
  }

  /**
   * Process any value (string, object, array) and replace placeholders
   */
  private processValue(value: any, context: RequestContext): any {
    if (typeof value === 'string') {
      return this.replacePlaceholders(value, context);
    } else if (Array.isArray(value)) {
      return value.map(item => this.processValue(item, context));
    } else if (value && typeof value === 'object') {
      const result: any = {};
      for (const [key, val] of Object.entries(value)) {
        // Preserve entity field without processing placeholders
        if (key === 'entity') {
          result[key] = val;
        } else {
          result[key] = this.processValue(val, context);
        }
      }
      return result;
    }
    
    return value;
  }

  /**
   * Replace placeholders in a string
   * Supports: @header:key, @param:key, @query:key, @body:key
   */
  private replacePlaceholders(str: string, context: RequestContext): any {
    if (typeof str !== 'string') {
      return str;
    }

    // Pattern to match placeholders like @header:x-tenant-id, @param:skip, etc.
    const placeholderPattern = /@(header|param|query|body):([a-zA-Z0-9_.-]+)/g;
    
    // Check if the entire string is just one placeholder
    const singlePlaceholderMatch = str.match(/^@(header|param|query|body):([a-zA-Z0-9_.-]+)$/);
    if (singlePlaceholderMatch) {
      const [, source, key] = singlePlaceholderMatch;
      const value = this.getValueFromSource(source, key, context);
      
      // For skip/limit parameters, ensure they are numbers
      if ((key === 'skip' || key === 'limit') && value !== null && value !== undefined) {
        const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
        return isNaN(numValue) ? (key === 'skip' ? 0 : 10) : numValue;
      }
      
      return value !== null && value !== undefined ? value : str;
    }
    
    // Multiple placeholders or mixed content - replace as strings
    return str.replace(placeholderPattern, (match, source, key) => {
      const value = this.getValueFromSource(source, key, context);
      
      // For skip/limit in mixed content, convert to number string
      if ((key === 'skip' || key === 'limit') && value !== null && value !== undefined) {
        const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
        return isNaN(numValue) ? (key === 'skip' ? '0' : '10') : String(numValue);
      }
      
      return value !== null && value !== undefined ? String(value) : match;
    });
  }

  /**
   * Get value from specific source (header, param, query, body)
   */
  private getValueFromSource(source: string, key: string, context: RequestContext): any {
    switch (source.toLowerCase()) {
      case 'header':
        // Headers are often case-insensitive, check both ways
        return context.headers[key] || 
               context.headers[key.toLowerCase()] || 
               context.headers[key.toUpperCase()];
               
      case 'param':
        // Handle common parameter mappings
        if (key === '_id' && context.params['id']) {
          return context.params['id'];
        }
        // For skip/limit, check query params first, then route params
        if ((key === 'skip' || key === 'limit') && context.query[key] !== undefined) {
          const value = context.query[key];
          return typeof value === 'string' ? parseInt(value, 10) : value;
        }
        return context.params[key];
        
      case 'query':
        // Convert string numbers to integers for skip/limit
        const queryValue = context.query[key];
        if ((key === 'skip' || key === 'limit') && typeof queryValue === 'string') {
          return parseInt(queryValue, 10);
        }
        return queryValue;
        
      case 'body':
        // Support nested body properties with dot notation
        return this.getNestedValue(context.body, key);
        
      default:
        return null;
    }
  }

  /**
   * Get nested value from object using dot notation
   * Example: user.profile.name -> obj.user.profile.name
   */
  private getNestedValue(obj: any, path: string): any {
    if (!obj || typeof obj !== 'object') {
      return null;
    }

    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj);
  }

  /**
   * Parse JSON string safely and apply mapping
   */
  mapJsonString(jsonString: string, context: RequestContext): any {
    try {
      const parsed = JSON.parse(jsonString);
      return this.mapResponse(parsed, context);
    } catch (error) {
      // If not valid JSON, treat as string and replace placeholders
      return this.replacePlaceholders(jsonString, context);
    }
  }

  /**
   * Map MongoDB aggregation pipeline
   */
  mapAggregationPipeline(pipeline: string | any[], context: RequestContext): any[] {
    try {
      let pipelineArray: any[];
      
      if (typeof pipeline === 'string') {
        pipelineArray = JSON.parse(pipeline);
      } else if (Array.isArray(pipeline)) {
        pipelineArray = pipeline;
      } else {
        return [];
      }

      return this.processValue(pipelineArray, context);
    } catch (error) {
      console.error('Error mapping aggregation pipeline:', error);
      return [];
    }
  }

  /**
   * Set default values for common parameters if not provided
   */
  setDefaults(context: RequestContext): RequestContext {
    const defaultParams = {
      skip: 0,
      limit: 10
    };

    const defaultQuery = {
      skip: 0,
      limit: 10
    };

    return {
      ...context,
      params: { ...defaultParams, ...context.params },
      query: { ...defaultQuery, ...context.query }
    };
  }
}

// Factory function
export function createResponseMapper(): ResponseMapper {
  return new ResponseMapper();
}