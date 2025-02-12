import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Test from "@/models/tests.model";
import { questionSchema } from "@/lib/zod/questionsSchema";
import Question from "@/models/question.model";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const { testId, ...questionData } = await request.json();

    if (!testId) {
      return NextResponse.json({ error: "Provide Test ID" }, { status: 400 });
    }

    const test = await Test.findById(testId);
    if (!test) {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    const createdQuestion = await Question.create({
      testId,
      ...questionData,
    });

    if (!createdQuestion) {
      return NextResponse.json(
        { error: "Error creating test" },
        { status: 400 }
      );
    }

    // Push question to test
    await Test.findByIdAndUpdate(testId, {
      $push: { questions: createdQuestion._id },
    });

    return NextResponse.json({ data: createdQuestion }, { status: 201 });
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
    const testId = request.nextUrl.searchParams.get("testId");

    if (!testId) {
      return NextResponse.json({ error: "Provide Test ID" }, { status: 400 });
    }

    const questions = await Question.find({ testId }).lean();

    if (!questions) {
      return NextResponse.json(
        { error: "No test found. Please create first" },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: questions, status: 200 }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
