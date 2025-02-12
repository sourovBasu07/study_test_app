import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Teacher from "@/models/teacher.model";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const { password, ...data } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    delete data.confirmPassword;

    const newTeacher = await Teacher.create({
      password: hashedPassword,
      ...data,
    });
    if (!newTeacher) {
      return NextResponse.json(
        { error: "Error creating teacher" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { data: newTeacher, status: 201 },
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
    const teachers = await Teacher.find({}).lean();

    if (!teachers) {
      return NextResponse.json(
        { error: "No teacher found. Please add teachers first" },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: teachers, status: 200 }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
