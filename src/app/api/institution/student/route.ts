import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { admissionSchema } from "@/lib/zod/studentSchema";
import Student from "@/models/student.model";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const formData = await request.json();

    const newStudent = await Student.create(formData);
    if (!newStudent) {
      return NextResponse.json(
        { error: "Error creating test" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { data: newStudent, status: 201 },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  await connectDB();
  try {
    const students = await Student.find({}).lean();

    if (!students) {
      return NextResponse.json(
        { error: "No student found. Please add students first" },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: students, status: 200 }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
