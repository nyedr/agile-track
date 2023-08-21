import { prisma } from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { projectName } = req.query;

  if (typeof projectName !== "string" || !projectName) {
    return res.status(400).json({ error: "Invalid project name" });
  }

  const foundProject = await prisma.project.findUnique({
    where: {
      name: projectName.trim(),
    },
  });

  if (!foundProject) {
    return res.status(404).json({ error: "Project not found" });
  }

  const issues = await prisma.issue.findMany({
    where: {
      projectId: foundProject.id,
    },
    include: {
      project: true,
    },
  });

  return res.status(200).json(issues);
}
