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
    .gte(10, "Minimum 10 questions")
    .lte(100, "Maximum 100 questions"),
});

export const updateTestSchema = z.object({
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
    .gte(10, "Minimum 10 questions")
    .lte(100, "Maximum 100 questions"),
});
