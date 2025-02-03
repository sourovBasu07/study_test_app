import { connectDB } from "@/lib/mongodb";
import { questionSchema } from "@/lib/zod/questionsSchema";
import Test from "@/models/tests.model";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  try {
    const testId = (await params).id;

    console.log(testId);

    if (!testId) {
      return NextResponse.json({ error: "Test ID not found" }, { status: 400 });
    }

    const test = await Test.findOne({ _id: testId });

    console.log("Test", test);

    if (!test) {
      return NextResponse.json({ error: "Invalid test ID" }, { status: 400 });
    }

    return NextResponse.json({ data: test, status: 200 }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  try {
    const testId = (await params).id;

    const formData = await request.json();
    const { success, data: parsedData } = questionSchema.safeParse(formData);

    if (!testId) {
      return NextResponse.json({ error: "Test ID not found" }, { status: 400 });
    }

    const test = await Test.findOne({ _id: testId });

    console.log("Test", test);

    if (!test) {
      return NextResponse.json({ error: "Invalid test ID" }, { status: 400 });
    }

    return NextResponse.json({ data: test, status: 200 }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
