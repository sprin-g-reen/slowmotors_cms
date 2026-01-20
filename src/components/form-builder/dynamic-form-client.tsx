"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDefinition } from "@/types/form";
import { generateZodSchema } from "@/lib/form-utils";
import { submitForm } from "@/actions/submit-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

interface DynamicFormClientProps {
  formId: string;
  definition: FormDefinition;
}

export function DynamicFormClient({
  formId,
  definition,
}: DynamicFormClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formSchema = generateZodSchema(definition);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: definition.fields.reduce((acc, field) => {
      acc[field.name] = field.type === "checkbox" ? false : "";
      return acc;
    }, {} as Record<string, unknown>),
  });

  async function onSubmit(data: Record<string, unknown>) {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await submitForm(formId, data);
      if (result.success) {
        setIsSuccess(true);
        form.reset();
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch (e) {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center text-card-foreground shadow-sm">
        <h3 className="mb-2 text-2xl font-semibold">Thank you!</h3>
        <p className="text-muted-foreground">
          Your submission has been received. We will get back to you shortly.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setIsSuccess(false)}
        >
          Submit another response
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {definition.fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>
                    {field.label}
                    {field.required && <span className="text-destructive"> *</span>}
                  </FormLabel>
                  <FormControl>
                    {field.type === "select" ? (
                      <Select
                        onValueChange={formField.onChange}
                        defaultValue={formField.value as string}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === "textarea" ? (
                      <Textarea {...formField} value={formField.value as string} />
                    ) : field.type === "checkbox" ? (
                      <div className="flex items-center space-x-2">
                         <Checkbox
                          checked={formField.value as boolean}
                          onCheckedChange={formField.onChange}
                        />
                        <span className="text-sm text-muted-foreground">
                            {/* Checkbox label handled by FormLabel parent usually, but ShadCN checkbox pattern can vary.
                                Keeping it simple based on provided components. */}
                        </span>
                      </div>
                    ) : (
                      <Input type={field.type} {...formField} value={formField.value as string} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
