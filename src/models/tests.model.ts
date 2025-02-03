import { CreateTestDocument } from "@/types/UserSchemaType";
import mongoose from "mongoose";
import { model } from "mongoose";
import { Schema } from "mongoose";

// Define the Option schema
const OptionSchema = new Schema({
  text: { type: String, required: true },
});

// Custom validator for the options array length
function arrayLimit(val: any[]) {
  return val.length >= 2 && val.length <= 5;
}

const QuestionSchema = new Schema({
  question: { type: String, required: true, minlength: 10 },
  options: {
    type: [OptionSchema],
    required: true,
    validate: [arrayLimit, "Options must be between 2 and 5"],
  },
  correctAnswer: {
    number: { type: Number, required: true },
    text: { type: String, required: true },
  },
});

const TestSchema = new Schema<CreateTestDocument>(
  {
    subject: {
      type: String,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    questions: {
      type: [QuestionSchema],
    },
  },
  {
    timestamps: true,
  }
);

const Test =
  mongoose.models.Test || model<CreateTestDocument>("Test", TestSchema);

export default Test;
