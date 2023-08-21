import { prisma } from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (typeof userId !== "string" || !userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  const projectsFromProjectMember = await prisma.projectMember.findMany({
    where: {
      id: userId,
    },
    include: {
      project: true, // Include the related project information
    },
  });

  // Extracting the projects from the projectMembers
  const projects = projectsFromProjectMember.map((member) => member.project);

  res.status(200).json(projects);
}
