import { z } from "zod";

export const admissionSchema = z.object({
  studentId: z.string(),
  admissionDate: z.string(),
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
  roll: z.string().transform((value) => parseInt(value)),
  year: z.string().transform((value) => parseInt(value)),
  department: z.enum(["arts", "commerce", "science"]).optional(),
  gender: z.enum(["male", "female"]),
  religion: z.enum(["hinduism", "islan", "christianity", "buddhism"]),
  dateOfBirth: z.date(),
  guardianContactNumber: z.string().trim().length(11, "Wrong phone number"),
  birthCertificateNumber: z.string(),
  birthCertificate: z.string().optional(),
  photo: z.string().optional(),
  transferCertificate: z.string().optional(),
  remarks: z.string().optional(),
  address: z
    .string()
    .min(1, "Address is required")
    .max(150, "Maximum 150 letters"),
});
