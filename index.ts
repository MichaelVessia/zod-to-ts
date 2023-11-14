import { z } from "zod";

export function transformZodToTypeScript(
  zodSchema: z.ZodTypeAny,
  schemaName: string,
): string {
  if (zodSchema instanceof z.ZodObject) {
    return `interface ${schemaName} ${transformZodObject(zodSchema)}\n`;
  }

  // Handle other top-level Zod types if needed
  return `type ${schemaName} = unknown;`;
}

function transformZodObject(zodObject: z.ZodObject<any, any, any>): string {
  let result = "{\n";
  for (const key in zodObject.shape) {
    const fieldSchema = zodObject.shape[key];
    result += `  ${key}: ${transformField(fieldSchema)};\n`;
  }
  result += "}";
  return result;
}

function transformField(fieldSchema: z.ZodTypeAny): string {
  let baseType = transformBaseType(fieldSchema._def.innerType || fieldSchema);

  if (fieldSchema.isNullable() && fieldSchema.isOptional()) {
    return `${baseType} | null | undefined`;
  } else if (fieldSchema.isNullable()) {
    return `${baseType} | null`;
  } else if (fieldSchema.isOptional()) {
    return `${baseType} | undefined`;
  }

  return baseType;
}

function transformBaseType(fieldSchema: z.ZodTypeAny): string {
  if (fieldSchema instanceof z.ZodString) {
    return "string";
  } else if (fieldSchema instanceof z.ZodNumber) {
    return "number";
  } else if (fieldSchema instanceof z.ZodBoolean) {
    return "boolean";
  } else if (fieldSchema instanceof z.ZodObject) {
    return transformZodObject(fieldSchema);
  } else if (fieldSchema instanceof z.ZodArray) {
    const elementType = fieldSchema.element;
    return `Array<${transformField(elementType)}>`;
  } else if (fieldSchema instanceof z.ZodUnion) {
    const types = fieldSchema.options.map(transformField);
    return types.join(" | ");
  }
  // Add more cases for other Zod types

  return "unknown";
}
