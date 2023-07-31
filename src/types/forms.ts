import { z } from "zod";

export const userSignupSchema = z
  .object({
    first_name: z.string().nonempty({ message: "First name is required" }),
    last_name: z.string().nonempty({ message: "Last name is required" }),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(3, {
        message: "Email must be at least 3 characters.",
      })
      .max(255, {
        message: "Email must be at most 255 characters.",
      }),
    password: z
      .string()
      // .regex(/^(?=.*?[A-Z]).*$/, {
      //   message: "Password must contain at least one uppercase letter.",
      // })
      // .regex(/^(?=.*?[a-z]).*$/, {
      //   message: "Password must contain at least one lowercase letter.",
      // })
      // .regex(/^(?=.*?[0-9]).*$/, {
      //   message: "Password must contain at least one number.",
      // })
      // .regex(/^(?=.*?[#?!@$ %^&*-]).*$/, {
      //   message: "Password must contain at least one special character.",
      // })
      .min(8, { message: "Password must be at least 8 characters." })
      .max(32, { message: "Password must be at most 32 characters." }),
    password_confirmation: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type UserSignupData = z.infer<typeof userSignupSchema>;
