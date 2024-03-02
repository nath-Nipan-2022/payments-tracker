"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { paymentSchema } from "@/schemas/payment-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface CreatePaymentState {
  errors: {
    amount?: string[] | undefined;
    payingMonth?: string[] | undefined;
    date?: string[] | undefined;
    _form?: string[];
  };
  success?: boolean;
}

export async function createPayment(
  slug: string,
  data: z.infer<typeof paymentSchema>
): Promise<CreatePaymentState> {
  const result = paymentSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session?.user) {
    return {
      errors: {
        _form: ["You must be signed in to create a payment"],
      },
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

  return {
    errors: { _form: [] },
    success: true,
  };
}
