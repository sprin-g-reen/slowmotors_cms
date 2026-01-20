import { z } from "zod";

export type FieldType = "text" | "email" | "select" | "textarea" | "checkbox";

export interface FieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[]; // For select fields
  validation?: {
    min?: number;
    max?: number;
  };
}

export interface FormDefinition {
  fields: FieldDefinition[];
}
