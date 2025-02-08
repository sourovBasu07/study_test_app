import mongoose, { model } from "mongoose";
import { models } from "mongoose";
import { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    studentId: { type: String, required: true, unique: true },
    admissionDate: { type: String, required: true },
    studentName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    fatherName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    motherName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    class: { type: String, required: true },
    section: { type: String, trim: true },
    roll: { type: Number, required: true },
    year: { type: Number, required: true },
    department: {
      type: String,
      enum: ["arts", "commerce", "science"],
      default: null,
    },
    gender: { type: String, enum: ["male", "female"], required: true },
    religion: {
      type: String,
      enum: ["hinduism", "islam", "christianity", "buddhism"],
      required: true,
    },
    dateOfBirth: { type: Date, required: true },
    guardianContactNumber: {
      type: String,
      required: true,
      trim: true,
      length: 11,
    },
    birthCertificateNumber: { type: String, required: true },
    birthCertificate: { type: String },
    photo: { type: String },
    transferCertificate: { type: String },
    remarks: { type: String },
    address: { type: String, required: true, minlength: 1, maxlength: 150 },
  },
  { timestamps: true } // Auto adds createdAt and updatedAt timestamps
);

const Student = models.Student || model("Student", studentSchema);
export default Student;
