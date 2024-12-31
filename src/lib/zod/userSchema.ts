import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long" })
    .max(25, { message: "Password should be at most 25 characters long" }),
});

export const signupFormSchema = z
  .object({
    email: z.string().email(),
    username: z
      .string()
      .min(3, { message: "Username should be at least 3 characters long" })
      .max(25, { message: "Username should be at most 25 characters long" }),
    password: z
      .string()
      .min(8, { message: "Password should be at least 8 characters long" })
      .max(25, { message: "Password should be at most 25 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password should be at least 8 characters long" })
      .max(25, { message: "Password should be at most 25 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
