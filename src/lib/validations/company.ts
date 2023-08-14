import { z } from "zod";

export const companySchema = z.object({
  name: z.string(),
  address: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
      message: "Invalid phone number",
    })
    .optional(),
  website: z.string().url("Invalid website url").optional(),
  description: z.string().optional(),
  isPublic: z.boolean().default(false),
});

export type Company = z.infer<typeof companySchema>;
