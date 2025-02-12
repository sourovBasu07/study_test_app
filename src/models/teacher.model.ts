import { model, Schema, models } from "mongoose";

const teacherSchema = new Schema(
  {
    teacherId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, trim: true, maxlength: 25 },
    password: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    teacherFirstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    teacherLastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    contactNumber: {
      type: Number,
      required: true,
      validate: {
        validator: function (v: number) {
          return /^[0-9]{10}$/.test(v.toString()); // Ensures exactly 10 digits
        },
        message: "Enter exactly 10 digits after +880",
      },
    },
    qualification: { type: String, required: true, trim: true, maxlength: 100 },
    designation: { type: String, required: true, trim: true },
    department: {
      type: String,
      enum: ["arts", "commerce", "science"],
      required: false,
    },
    subjects: {
      type: [String],
      validate: {
        validator: (arr: string[]) => arr.length >= 1 && arr.length <= 3,
        message: "Subjects must be between 1 and 3",
      },
    },
    gender: { type: String, enum: ["male", "female"], required: true },
    religion: {
      type: String,
      enum: ["hinduism", "islam", "christianity", "buddhism"],
      required: true,
    },
    dateOfBirth: { type: Date, required: true },
    nidNumber: { type: Number, required: true },
    nid: { type: String, required: false }, // Store file URL or path
    photo: { type: String, required: false }, // Store file URL or path
    joiningLetter: { type: String, required: false }, // Store file URL or path
    address: { type: String, required: true, maxlength: 150 },
  },
  { timestamps: true }
);

const Teacher = models.Teacher || model("Teacher", teacherSchema);

export default Teacher;
