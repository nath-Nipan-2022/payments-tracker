"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { paymentSchema } from "@/schemas/payment-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

interface CreatePaymentState {
  errors: {
    _form?: string[];
  };
}

export async function createPayment(
  slug: string,
  state: CreatePaymentState,
  data: z.infer<typeof paymentSchema>
) {
  console.log(slug, state, data);

  const result = paymentSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session?.user) {
    return {
      errors: ["You must be signed in to create a payment"],
    };
  }

  try {
    await db.payment.create({
      data: {
        paymentAmount: parseInt(result.data.amount),
        payingMonth: result.data.payingMonth,
        paymentDate: result.data.date,
        studentId: parseInt(slug),
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

  revalidatePath(paths.showStudent(session.user.id || "", slug));
}
