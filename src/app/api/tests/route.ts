import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Test from "@/models/tests.model";
import { createTestSchema } from "@/lib/zod/testSchema";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const formData = await request.json();
    const { success, data: parsedData } = createTestSchema.safeParse(formData);

    if (!success) {
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
