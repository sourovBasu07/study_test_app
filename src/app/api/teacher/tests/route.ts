import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Test from "@/models/tests.model";
import { createTestSchema } from "@/lib/zod/testSchema";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const formData = await request.json();
    const {
      success,
      data: parsedData,
      error,
    } = createTestSchema.safeParse(formData);

    if (!success) {
      console.log(error);

      return NextResponse.json(
        { error: "Error parsing data. Please check your inputs." },
        { status: 400 }
      );
    }

    const createdTest = await Test.create(parsedData);
    if (!createdTest) {
      return NextResponse.json(
        { error: "Error creating test" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { data: createdTest, status: 201 },
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
    const tests = await Test.find({}).lean();

    console.log("Test", tests);

    if (!tests) {
      return NextResponse.json(
        { error: "No test found. Please create first" },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: tests, status: 200 }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
