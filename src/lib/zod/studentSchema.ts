import { z } from "zod";

export const admissionSchema = z.object({
  studentId: z.string(),
  admissionDate: z.date(),
  studentName: z
    .string()
    .trim()
    .min(3, "Minimum 3 letters")
    .max(100, "Maximum 100 letters"),
  fatherName: z
    .string()
    .trim()
    .min(3, "Minimum 3 letters")
    .max(100, "Maximum 100 letters"),
  motherName: z
    .string()
    .trim()
    .min(3, "Minimum 3 letters")
    .max(100, "Maximum 100 letters"),
  class: z.string(),
  section: z.string().trim().optional(),
  roll: z.number(),
  year: z.number(),
  department: z.enum(["arts", "commerce", "science"]).optional(),
  gender: z.enum(["male", "female"]),
  religion: z.enum(["hinduism", "islan", "christianity", "buddhism"]),
  dateOfBirth: z.date(),
  guardianContactNumber: z
    .number()
    .refine((num) => num.toString().length === 10, {
      message: "Enter 10 digits after +880",
    }),
  birthCertificateNumber: z.number(),
  birthCertificate: z.instanceof(File).optional(),
  photo: z.instanceof(File).optional(),
  transferCertificate: z.instanceof(File).optional(),
  remarks: z.string().optional(),
  address: z
    .string()
    .min(1, "Address is required")
    .max(150, "Maximum 150 letters"),
});
