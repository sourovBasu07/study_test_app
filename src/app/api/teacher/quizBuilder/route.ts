import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getErrorMessage } from "@/utils/getErrorMessage";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const data = await request.json();

    console.log(data);

    const { email, username, password } = data;

    // const user = await User.findOne({ email });

    // if (user) {
    //   return NextResponse.json(
    //     { error: "Email already exists " },
    //     { status: 400 }
    //   );
    // } else {
    //   await User.create({ email, username, password: hashedPassword });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 200 }
    );
    // }
  } catch (error: any) {
    return NextResponse.json(
      { message: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
