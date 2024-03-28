import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 character(s)" }),
  class: z.string(),
  schoolName: z.string(),
  phoneNumber: z
    .string()
    .regex(/^(?:\+91|)(\d{10})$/, {
      message: "Please enter a valid phone number",
    }),
  admissionDate: z.date(),
});

export type StudentSchemaType = z.infer<typeof studentSchema>;
