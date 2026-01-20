"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DynamicFormClient } from "@/components/form-builder/dynamic-form-client";
import { FormDefinition } from "@/types/form";

interface BookingDialogProps {
  formId: string;
  definition: FormDefinition;
  rideTitle: string;
}

export function BookingDialog({ formId, definition, rideTitle }: BookingDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">Request Booking</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request Booking</DialogTitle>
          <DialogDescription>
            Submit your interest for <strong>{rideTitle}</strong>. We&apos;ll be in touch shortly.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
           {/*
             Ideally, we might want to pre-fill the form with the Ride name if the form allows it.
             For now, the DynamicFormClient renders the generic form.
             We could pass hidden fields in the future.
           */}
           <DynamicFormClient formId={formId} definition={definition} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
