"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { StudentSchemaType, studentSchema } from "@/schemas/student-schema";
import { Student } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface UpdateStudentState {
  errors: {
    _form?: string[];
  };
}

export async function updateStudent(
  id: string,
  data: StudentSchemaType
): Promise<UpdateStudentState> {
  const result = studentSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: {
        ...result.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }

  const session = await auth();
  if (!session?.user) {
    return {
      errors: {
        _form: ["You must be signed in first!"],
      },
    };
  }

  let student: Student;
  try {
    student = await db.student.update({
      data: { ...result.data },
      where: {
        id: parseInt(id),
        userId: session.user.id,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong!"],
        },
      };
    }
  }

  revalidatePath("/");
  redirect(paths.showStudent(`${session?.user?.id}`, `${student.id}`));
}
