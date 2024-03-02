"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface DeletePaymentState {
  errors?: {
    _form?: string[];
  };
}

export async function deletePayment(
  studentId: string,
  paymentId: string
): Promise<DeletePaymentState> {
  const session = await auth();
  if (!session?.user) {
    return {
      errors: {
        _form: ["You must be signed in to create a payment"],
      },
    };
  }

  try {
    await db.payment.delete({
      where: {
        id: parseInt(paymentId),
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

  revalidatePath(paths.showStudent(session.user.id || "", studentId));
  redirect(paths.showStudent(session.user.id || "", studentId));
}
