import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prismadb";

export default async function Get(req: NextApiRequest, res: NextApiResponse) {
  const { projectName } = req.query;

  if (typeof projectName !== "string") {
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

  return res.status(200).json(foundProject);
}
