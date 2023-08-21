import { prisma } from "@/lib/prismadb";
import { catchErrors } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId || typeof userId !== "string")
    return res.status(400).json({ error: "Missing user ID." });

  try {
    const issues = await prisma.issue.findMany({
      where: {
        OR: [{ assigneeId: userId }, { reporterId: userId }],
      },
      include: {
        project: true,
        assignee: true,
        reporter: true,
        comments: true,
      },
    });

    res.status(200).json(issues);
  } catch (error) {
    catchErrors(error, res);
  }
}
