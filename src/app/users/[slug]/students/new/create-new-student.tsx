"use client";

import { createStudent } from "@/actions";
import StudentForm from "@/components/common/student-form";
import { StudentSchemaType } from "@/schemas/student-schema";

export const CreateNewStudent = () => {
  const formAction = (values: StudentSchemaType) => createStudent(values);

  return <StudentForm formAction={formAction} onSuccess={() => {}} />;
};
