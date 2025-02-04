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

    const test = await Test.findById(testId);
    if (!test) {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    const createdQuestion = await Question.create(questionData);
    if (!createdQuestion) {
      return NextResponse.json(
        { error: "Error creating test" },
        { status: 400 }
      );
    }

    test.questions.push(createdQuestion._id);
    await test.save();

    return NextResponse.json(
      { message: "Question added successfully", question: createdQuestion },
      { status: 201 }
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
    const tests = await Test.find({});

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
