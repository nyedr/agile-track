import { NextApiRequest, NextApiResponse } from "next";
import { userSignupSchema, UserSignupData } from "@/types/forms";
import { prisma } from "@/lib/prismadb";
import bcrypt from "bcryptjs";

const handleRegistration = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const parsedInput = await userSignupSchema.safeParseAsync(
    req.body as UserSignupData
  );

  if (!parsedInput?.success) {
    return res.status(400).json({
      message: "Invalid fields: " + parsedInput?.error.message,
    });
  }

  const { first_name, last_name, email, password } = parsedInput.data;

  // check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const newUser = await prisma.user.create({
    data: {
      username: `${first_name} ${last_name}`,
      email,
      password: hashedPassword,
    },
  });

  return res.send({ user: newUser, message: "User created successfully" });
};

export default handleRegistration;
