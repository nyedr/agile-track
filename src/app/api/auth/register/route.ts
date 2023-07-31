import { NextApiRequest } from "next";
import { userRegisterSchema, UserRegisterData } from "@/types/forms";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextApiRequest) => {
  const parsedInput = await userRegisterSchema.safeParseAsync(
    req.body as UserRegisterData
  );

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
    },
  });

  return NextResponse.json({
    user: newUser,
    message: "User created successfully",
  });
};
