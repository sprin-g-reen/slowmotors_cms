import { DynamicFormClient } from "./dynamic-form-client";
import { FormDefinition } from "@/types/form";
import prisma from "@/lib/db";

interface DynamicFormProps {
  formId: string;
}

export async function DynamicForm({ formId }: DynamicFormProps) {
  const form = await prisma.dynamicForm.findUnique({
    where: { id: formId },
  });

  if (!form || !form.isActive) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        Form not found or inactive.
      </div>
    );
  }

  const definition = form.schema as unknown as FormDefinition;

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">{form.name}</h2>
      <DynamicFormClient formId={form.id} definition={definition} />
    </div>
  );
}
