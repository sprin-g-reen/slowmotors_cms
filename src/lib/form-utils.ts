import { z } from "zod";
import { FormDefinition } from "@/types/form";

export function generateZodSchema(definition: FormDefinition) {
  const shape: Record<string, z.ZodTypeAny> = {};

  definition.fields.forEach((field) => {
    let schema: z.ZodTypeAny;

    switch (field.type) {
      case "email":
        schema = z.string().email({ message: "Invalid email address" });
        break;
      case "checkbox":
        schema = z.boolean().default(false);
        break;
      case "text":
      case "textarea":
      case "select":
      default:
        schema = z.string();
        break;
    }

    if (field.type !== "checkbox") {
      if (field.required) {
        if (schema instanceof z.ZodString) {
          schema = schema.min(1, { message: `${field.label} is required` });
        }
      } else {
        schema = schema.optional();
      }
    }

    // Apply validations
    // Note: TypeScript might lose type refinement after assignment.
    // Casting to ZodString to access min/max safely since we checked instanceof ZodString above
    if (field.validation && schema instanceof z.ZodString) {
      if (field.validation.min !== undefined) {
        schema = (schema as z.ZodString).min(field.validation.min, {
          message: `${field.label} must be at least ${field.validation.min} characters`,
        });
      }
      if (field.validation.max !== undefined) {
        schema = (schema as z.ZodString).max(field.validation.max, {
          message: `${field.label} must be at most ${field.validation.max} characters`,
        });
      }
    }

    shape[field.name] = schema;
  });

  return z.object(shape);
}
