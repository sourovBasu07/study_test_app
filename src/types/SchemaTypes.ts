import { admissionSchema } from "@/lib/zod/studentSchema";
import { ObjectId } from "mongoose";
import { z } from "zod";

export interface UserDocument {
  _id: string;
  email: string;
  username: string;
  password: string;
  name: string;
  phone: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionDocument {
  _id: string;
  testId: ObjectId;
  questionNumber: number;
  question: string;
  options: string[];
  correctAnswer: {
    number: number;
    text: string;
  };
  marks: number;
  questionType: "mcq" | "written";
  hint?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestDocument {
  _id: string;
  subject: string;
  totalQuestions: number;
  duration: number;
  questions: ObjectId[];
  marks: number;
  testDate: string;
  createdAt: Date;
  updatedAt: Date;
}

export type StudentDocument = z.infer<typeof admissionSchema> & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};
