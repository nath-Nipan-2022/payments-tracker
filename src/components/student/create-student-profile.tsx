"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import StudentForm from "../common/student-form";

import { createStudent } from "@/actions";
import { StudentSchemaType } from "@/schemas/student-schema";

export function CreateStudentProfile() {
  const [open, setOpen] = useState(false);

  const formAction = (values: StudentSchemaType) => createStudent(values);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Student</DialogTitle>
          <DialogDescription>Add new member in your batch.</DialogDescription>
        </DialogHeader>
        <StudentForm formAction={formAction} onSuccess={() => setOpen(false)} />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
