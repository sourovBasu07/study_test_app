import { QuestionDocument } from "@/types/SchemaTypes";
import mongoose from "mongoose";
import { model } from "mongoose";
import { Schema } from "mongoose";

// Custom validator for the options array length
function arrayLimit(val: any[]) {
  return val.length >= 2 && val.length <= 5;
}

export const QuestionSchema = new Schema<QuestionDocument>({
  questionNumber: {
    type: Number,
    required: true,
  },
  question: { type: String, required: true, minlength: 10 },
  options: {
    type: [String],
    required: true,
    validate: [arrayLimit, "Options must be between 2 and 5"],
  },
  correctAnswer: {
    number: { type: Number, required: true },
    text: { type: String, required: true },
  },
  marks: {
    type: Number,
    default: 1,
  },
  questionType: {
    type: String,
    enum: ["mcq", "text"],
    default: "mcq",
  },
  hint: {
    type: String,
  },
});

const Question =
  mongoose.models.Question ||
  model<QuestionDocument>("Question", QuestionSchema);

export default Question;
