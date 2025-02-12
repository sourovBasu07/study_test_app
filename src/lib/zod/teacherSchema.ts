import { z } from "zod";
import mongoose, { Schema } from "mongoose";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(25, "Maximum 25 characters")
  .regex(/[0-9]/, "Password must include at least one number")
  .regex(/[a-z]/, "Password must include at least one lowercase letter")
  .regex(/[A-Z]/, "Password must include at least one uppercase letter")
  .regex(
    /[$&+,:;=?@#|'<>.^*()%!-]/,
    "Password must include at least one special character"
  );

export const teacherSchema = z
  .object({
    teacherId: z.string(),
    email: z.string().email(),
    username: z
      .string()
      .trim()
      .min(1, "Username is required")
      .max(25, "Maximum 25 characters"),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    joiningDate: z.date(),
    teacherFirstName: z
      .string()
      .trim()
      .min(3, "Minimum 3 letters")
      .max(50, "Maximum 50 letters"),
    teacherLastName: z
      .string()
      .trim()
      .min(3, "Minimum 3 letters")
      .max(50, "Maximum 50 letters"),
    contactNumber: z.number().refine((num) => num.toString().length === 10, {
      message: "Enter 10 digits after +880",
    }),
    qualification: z
      .string()
      .trim()
      .min(1, "Qualification is required")
      .max(100, "Maximum 100 letters"),
    designation: z.string().trim().min(1, "designation is required"),
    department: z.enum(["arts", "commerce", "science"]).optional(),
    subjects: z
      .array(
        z
          .string()
          .trim()
          .min(1, "Subject is required")
          .max(100, "Maximum 50 letters")
          .optional()
      )
      .min(1, "Subject is required")
      .max(3, "Maximum 3 subjects"),
    gender: z.enum(["male", "female"]),
    religion: z.enum(["hinduism", "islan", "christianity", "buddhism"]),
    dateOfBirth: z.date(),
    nidNumber: z.number(),
    nid: z.instanceof(File).optional(),
    photo: z.instanceof(File).optional(),
    joiningLetter: z.instanceof(File).optional(),
    address: z
      .string()
      .min(1, "Address is required")
      .max(150, "Maximum 150 letters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
