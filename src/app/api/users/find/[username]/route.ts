import { prisma } from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (typeof userId !== "string" || !userId) {
    return res.status(400).json({ error: "Invalid user id" });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId.trim(),
    },
    select: {
      id: true,
      username: true,
      password: false,
      email: true,
      roles: true,
      companyId: true,
      createdAt: true,
      updatedAt: true,
      notificationsAllowed: true,
      deletedAt: true,
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json(user);
}
