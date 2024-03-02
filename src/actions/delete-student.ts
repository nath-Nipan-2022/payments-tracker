"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface DeleteStudentState {
  errors?: {
    _form?: string[];
  };
}

export async function deleteStudent(
  studentId: string
): Promise<DeleteStudentState> {
  const session = await auth();
  if (!session?.user) {
    return {
      errors: {
        _form: ["You are not signed in!"],
      },
    };
  }

  try {
    await db.student.delete({
      where: {
        id: parseInt(studentId),
      },
      include: {
        payments: true,
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
  redirect(paths.showAllStudents(`${session.user.id}`));
}
