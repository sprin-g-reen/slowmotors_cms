"use server";

import { generateZodSchema } from "@/lib/form-utils";
import { FormDefinition } from "@/types/form";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";
import { sendTransactionalEmail } from "@/lib/mail";
import { EnquiryReceived } from "@/emails/enquiry-received";
import { AdminNotification } from "@/emails/admin-notification";

export async function submitForm(formId: string, data: Record<string, unknown>) {
  try {
    const form = await prisma.dynamicForm.findUnique({
      where: { id: formId },
    });

    if (!form) {
      return { success: false, error: "Form not found" };
    }

    const definition = JSON.parse(form.schema) as FormDefinition;
    const zodSchema = generateZodSchema(definition);

    const validationResult = zodSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        error: "Validation failed",
        issues: validationResult.error.issues,
      };
    }

    const safeData = validationResult.data as Record<string, unknown>;

    await prisma.formSubmission.create({
      data: {
        dynamicFormId: formId,
        data: JSON.stringify(safeData),
      },
    });

    // Email Workflow
    // 1. Send acknowledgement to user if email exists
    if (typeof safeData.email === 'string') {
      await sendTransactionalEmail({
        to: safeData.email,
        subject: "We received your enquiry - Slow Motors",
        react: EnquiryReceived({
          name: (safeData.fullName as string) || "Valued Customer",
          formName: form.name,
        }) as React.ReactElement,
      });
    }

    // 2. Notify Admin
    await sendTransactionalEmail({
      to: "team@slowmotors.com", // Replace with env var in real app
      subject: `New Lead: ${form.name}`,
      react: AdminNotification({
        formName: form.name,
        formId: formId,
        submissionData: safeData,
      }) as React.ReactElement,
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting form:", error);
    return { success: false, error: "Internal server error" };
  }
}
