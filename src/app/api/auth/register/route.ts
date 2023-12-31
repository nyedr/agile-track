import { userRegisterSchema } from "@/lib/validations/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
  const parsedInput = await userRegisterSchema.safeParseAsync(req.body);

  if (!parsedInput?.success) {
    return NextResponse.json(
      {
        error: "Invalid fields: " + parsedInput?.error.message,
      },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, password } = parsedInput.data;

  // check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return NextResponse.json(
      {
        error: "User already exists",
      },
      { status: 400 }
    );
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const newUser = await prisma.user.create({
    data: {
      username: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      companyId: "1",
    },
  });

  return NextResponse.json({
    user: newUser,
    message: "User created successfully",
  });
};
