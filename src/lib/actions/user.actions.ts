"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export const createUser = async (values: any) => {
  const { email, username, password } = values;

  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }
    const usernameFound = await User.findOne({ username });
    if (usernameFound) {
      return {
        error: "Email already exists!",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return error;
  }
};
