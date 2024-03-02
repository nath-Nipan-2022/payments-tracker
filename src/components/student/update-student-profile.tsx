"use client";

import { useState } from "react";

import { Student } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import StudentForm from "../common/student-form";

import { updateStudent } from "@/actions";
import { studentSchema } from "@/schemas/student-schema";
import { z } from "zod";

export function UpdateStudentProfile({ student }: { student: Student }) {
  const [open, setOpen] = useState(false);

  const formAction = (values: z.infer<typeof studentSchema>) =>
    updateStudent(`${student.id}`, values);

  const defaultValues = {
    name: student.name,
    class: student.class,
    phone_number: student.phone_number,
    admission_date: student.admissionDate,
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to the profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <StudentForm
          defaultValues={defaultValues}
          formAction={formAction}
          onSuccess={() => setOpen(false)}
        />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
