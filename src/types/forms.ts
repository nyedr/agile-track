import { z } from "zod";

export const userRegisterSchema = z
  .object({
    firstName: z.string().nonempty({ message: "First name is required" }),
    lastName: z.string().nonempty({ message: "Last name is required" }),
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
    passwordConfirmation: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    notificationsAllowed: z.boolean(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type UserRegisterData = z.infer<typeof userRegisterSchema>;

export const userLoginSchema = z.object({
  email: z.string()
    .email({ message: "Invalid email address" })
    .min(3, {
      message: "Email must be at least 3 characters.",
    })
    .max(255, {
      message: "Email must be at most 255 characters.",
    }),
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters." })
      .max(32, { message: "Password must be at most 32 characters." }),
})

export type UserLoginData = z.infer<typeof userLoginSchema>;