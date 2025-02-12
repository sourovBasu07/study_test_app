import { TestDocument } from "@/types/SchemaTypes";
import mongoose from "mongoose";
import { model } from "mongoose";
import { Schema } from "mongoose";
import Question from "./question.model";

const TestSchema = new Schema<TestDocument>(
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
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: Question,
      },
    ],
    marks: {
      type: Number,
      required: true,
    },
    testDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.models.Test || model<TestDocument>("Test", TestSchema);

export default Test;
