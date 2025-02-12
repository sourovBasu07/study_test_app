import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user.model";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await connectDB();
  try {
    const session = await auth();
    console.log(session);

    const user = await User.findById(session?.user.id).lean();

    console.log("User", user);

    if (!user) {
      return NextResponse.json(
        { error: "No test found. Please create first" },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: user, status: 200 }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
