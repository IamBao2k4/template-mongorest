import { coreGlobal } from "../../../configs/core-global";
import { MyCustomDb } from "../../../core/adapters/mongodb/customs/DbCustom";

class executeQuery {
  // Execute MongoDB aggregation using core global
  public async executeMongoAggregation(processedQuery: any): Promise<any> {
    try {
      const db = coreGlobal.getCore().getAdapter("mongodb")
      if (db) {
        const customDb = await db.getIntanceDb()
        const entity = processedQuery.validationResults.mappedResponse.entity;
        const queryAdvance = processedQuery.validationResults.mappedResponse.queryAdvance;
        
        if (entity && queryAdvance) {
          // Parse aggregation pipeline
          let pipeline = JSON.parse(queryAdvance);
          
          // Convert string numbers to actual numbers in pipeline for MongoDB operators
          pipeline = this.convertStringNumbersInPipeline(pipeline);
          
          console.log(`Executing aggregation on collection: ${entity}`);
          console.log('Converted Pipeline:', JSON.stringify(pipeline, null, 2));
          
          // Execute aggregation
          const result = await customDb.collection(entity).aggregate(pipeline).toArray();
          return result;
        }
      }
      return null;
    } catch (error) {
      console.error('Error executing MongoDB aggregation:', error);
      return { error: 'Failed to execute aggregation', details: error };
    }
  }

  // Convert string numbers to actual numbers in MongoDB aggregation pipeline
  public convertStringNumbersInPipeline(pipeline: any): any {
    if (Array.isArray(pipeline)) {
      return pipeline.map(stage => this.convertStringNumbersInPipeline(stage));
    } else if (pipeline && typeof pipeline === 'object') {
      const converted: any = {};
      for (const [key, value] of Object.entries(pipeline)) {
        // Convert MongoDB operators that need numbers
        if ((key === '$skip' || key === '$limit') && typeof value === 'string') {
          const numValue = parseInt(value, 10);
          converted[key] = isNaN(numValue) ? (key === '$skip' ? 0 : 10) : numValue;
          console.log(`Converted ${key}: "${value}" -> ${converted[key]}`);
        } else if (key === 'skip' || key === 'limit') {
          // Handle skip/limit in $addFields or other contexts
          if (typeof value === 'string') {
            const numValue = parseInt(value, 10);
            converted[key] = isNaN(numValue) ? (key === 'skip' ? 0 : 10) : numValue;
            console.log(`Converted ${key}: "${value}" -> ${converted[key]}`);
          } else {
            converted[key] = value;
          }
        } else {
          converted[key] = this.convertStringNumbersInPipeline(value);
        }
      }
      return converted;
    }
    return pipeline;
  }
}

export const executeQueryInstance = new executeQuery();