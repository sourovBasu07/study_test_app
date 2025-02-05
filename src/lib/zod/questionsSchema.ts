import z from "zod";

export const optionSchema = z.object({
  option: z.string().min(1, "Option cannot be empty"),
});

export const questionSchema = z.object({
  question: z.string().min(10, "Minimum 10 characters are required"),
  options: z
    .array(optionSchema)
    .max(5, "Maximum of 5 options allowed")
    .min(2, "At least 2 options are required"),
  correctAnswer: z.string({ message: "please select the correct answer" }),
  marks: z.number().optional().default(1),
  questionType: z.enum(["mcq", "written"]).optional().default("mcq"),
  hint: z.string().optional(),
});
