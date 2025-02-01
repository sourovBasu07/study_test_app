import { CreateTestDocument } from "@/types/UserSchemaType";
import mongoose from "mongoose";
import { model } from "mongoose";
import { Schema } from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

const Test =
  mongoose.models.Test || model<CreateTestDocument>("Test", TestSchema);

export default Test;
