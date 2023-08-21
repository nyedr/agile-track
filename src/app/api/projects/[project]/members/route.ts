import { prisma } from "@/lib/prismadb";
import { ProjectMember } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { projectName, username } = req.query;

  if (typeof projectName !== "string" || !projectName) {
    return res.status(400).json({ message: "Invalid project name" });
  }

  const projectMembers = await prisma.project.findUnique({
    where: { name: projectName },
    include: {
      projectMembers: true,
    },
  });

  // Extract the user IDs from the project members
  const userIds =
    projectMembers?.projectMembers.map(
      (member: ProjectMember) => member.userId
    ) || [];

  if (userIds.length === 0) {
    return res.status(200).json([]);
  }

  // Query the users based on the user IDs and username parameter
  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: username as string,
      },
      id: {
        in: userIds,
      },
    },
  });

  return res.status(200).json(users);
}
