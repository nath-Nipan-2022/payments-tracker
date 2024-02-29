import { z } from "zod";

export const paymentSchema = z.object({
  amount: z.string().min(2),
  payingMonth: z.string(),
  date: z.date(),
});
