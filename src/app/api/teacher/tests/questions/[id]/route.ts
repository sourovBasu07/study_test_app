import { connectDB } from "@/lib/mongodb";
import { questionSchema } from "@/lib/zod/questionsSchema";
import Question from "@/models/question.model";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  try {
    const questionId = (await params).id;
    const questionData = await request.json();

    const question = await Question.findByIdAndUpdate(
      questionId,
      questionData,
      { new: true }
    );

    if (!question) {
      return NextResponse.json(
        { error: "Invalid question ID or wrong inputs" },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: question, status: 200 }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
