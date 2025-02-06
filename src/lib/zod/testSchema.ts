import { z } from "zod";

export const createTestSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .max(50, "Maximum 50 characters"),
  totalQuestions: z
    .number()
    .gte(10, "Minimum 10 questions")
    .lte(100, "Maximum 100 questions"),
  duration: z
    .number()
    .gte(10, "Minimum 10 minutes")
    .lte(120, "Maximum 120 minutes"),
  marks: z.number().gte(10, "Minimum 10 marks").lte(100, "Maximum 100 marks"),
  testDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date()
  ),
});

export const updateTestSchema = createTestSchema.pick({
  subject: true,
  totalQuestions: true,
  duration: true,
  marks: true,
  testDate: true,
});
