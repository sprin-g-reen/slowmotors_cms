"use server";

import { generateZodSchema } from "@/lib/form-utils";
import { FormDefinition } from "@/types/form";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";

export async function submitForm(formId: string, data: Record<string, unknown>) {
  try {
    const form = await prisma.dynamicForm.findUnique({
      where: { id: formId },
    });

    if (!form) {
      return { success: false, error: "Form not found" };
    }

    const definition = form.schema as unknown as FormDefinition;
    const zodSchema = generateZodSchema(definition);

    const validationResult = zodSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        error: "Validation failed",
        issues: validationResult.error.issues,
      };
    }

    await prisma.formSubmission.create({
      data: {
        dynamicFormId: formId,
        data: validationResult.data as Prisma.InputJsonValue,
      },
    });

    // Stub: Trigger sendEnquiryEmail workflow
    console.log("Triggering email workflow for form:", formId);

    return { success: true };
  } catch (error) {
    console.error("Error submitting form:", error);
    return { success: false, error: "Internal server error" };
  }
}
