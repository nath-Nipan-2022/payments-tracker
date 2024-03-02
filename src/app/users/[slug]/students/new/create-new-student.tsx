"use client";

import { createStudent } from "@/actions";
import StudentForm from "@/components/common/student-form";
import { studentSchema } from "@/schemas/student-schema";
import { z } from "zod";

export const CreateNewStudent = () => {
  const formAction = (values: z.infer<typeof studentSchema>) =>
    createStudent(values);

  return <StudentForm formAction={formAction} onSuccess={() => {}} />;
};
