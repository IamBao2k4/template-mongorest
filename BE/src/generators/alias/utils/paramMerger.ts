import { Request } from 'express';

interface MergeOptions {
  headers?: string[];
  params?: string[];
  body?: string[];
  query?: string[];
  jwt?: string[];
}

export function mergeRequestParams(queryString: string, req: Request): any {
  let processedQuery = queryString;

  // Replace @header parameters
  const headerMatches = queryString.match(/@header:([a-zA-Z0-9-]+)/g);
  if (headerMatches) {
    headerMatches.forEach(match => {
      const headerName = match.replace('@header:', '');
      const headerValue = req.headers[headerName.toLowerCase()] || '';
      processedQuery = processedQuery.replace(match, JSON.stringify(headerValue));
    });
  }

  // Replace @param parameters (URL params)
  const paramMatches = queryString.match(/@param:([a-zA-Z0-9_]+)/g);
  if (paramMatches) {
    paramMatches.forEach(match => {
      const paramName = match.replace('@param:', '');
      const paramValue = req.params[paramName] || req.query[paramName] || 0;
      
      // Handle numeric values for skip/limit
      if (paramName === 'skip' || paramName === 'limit') {
        const numValue = parseInt(paramValue as string) || 0;
        processedQuery = processedQuery.replace(`"${match}"`, numValue.toString());
      } else {
        processedQuery = processedQuery.replace(match, JSON.stringify(paramValue));
      }
    });
  }

  // Replace @body parameters
  const bodyMatches = queryString.match(/@body:([a-zA-Z0-9_.]+)/g);
  if (bodyMatches) {
    bodyMatches.forEach(match => {
      const bodyPath = match.replace('@body:', '');
      const bodyValue = getNestedValue(req.body, bodyPath);
      processedQuery = processedQuery.replace(match, JSON.stringify(bodyValue));
    });
  }

  // Replace @jwt parameters (assuming JWT payload is in req.user)
  const jwtMatches = queryString.match(/@jwt:([a-zA-Z0-9_.]+)/g);
  if (jwtMatches) {
    jwtMatches.forEach(match => {
      const jwtPath = match.replace('@jwt:', '');
      const jwtValue = getNestedValue((req as any).user, jwtPath);
      processedQuery = processedQuery.replace(match, JSON.stringify(jwtValue));
    });
  }

  // Parse the processed query
  try {
    return JSON.parse(processedQuery);
  } catch (error) {
    console.error('Error parsing processed query:', error);
    console.error('Processed query:', processedQuery);
    throw new Error('Failed to parse query after parameter replacement');
  }
}

function getNestedValue(obj: any, path: string): any {
  const parts = path.split('.');
  let current = obj;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }

  return current;
}

export function extractRequiredParams(queryString: string): MergeOptions {
  const options: MergeOptions = {
    headers: [],
    params: [],
    body: [],
    query: [],
    jwt: []
  };

  // Extract headers
  const headerMatches = queryString.match(/@header:([a-zA-Z0-9-]+)/g);
  if (headerMatches) {
    options.headers = headerMatches.map(m => m.replace('@header:', ''));
  }

  // Extract params
  const paramMatches = queryString.match(/@param:([a-zA-Z0-9_]+)/g);
  if (paramMatches) {
    options.params = paramMatches.map(m => m.replace('@param:', ''));
  }

  // Extract body fields
  const bodyMatches = queryString.match(/@body:([a-zA-Z0-9_.]+)/g);
  if (bodyMatches) {
    options.body = bodyMatches.map(m => m.replace('@body:', ''));
  }

  // Extract JWT fields
  const jwtMatches = queryString.match(/@jwt:([a-zA-Z0-9_.]+)/g);
  if (jwtMatches) {
    options.jwt = jwtMatches.map(m => m.replace('@jwt:', ''));
  }

  return options;
}