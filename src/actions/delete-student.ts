import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface deleteStudentState {
  errors?: {
    _form?: string[];
  };
}

export async function deleteStudent(studentId: string) {
  const session = await auth();
  if (!session?.user) {
    return {
      errors: ["You must be signed in to create a payment"],
    };
  }

  try {
    await db.student.delete({
      where: {
        id: parseInt(studentId),
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
