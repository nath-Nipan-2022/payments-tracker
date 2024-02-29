import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 character(s)" }),
  class: z.string(),
  phone_number: z
    .string()
    .regex(/^\d{10}$/, { message: "Please enter 10 digits" }),
  admission_date: z.date(),
});
