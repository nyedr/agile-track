import { prisma } from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { project: projectName, issueTitle } = req.query;

  if (typeof projectName !== "string" || !projectName) {
    return res.status(400).json({ error: "Invalid project name" });
  }

  if (typeof issueTitle !== "string" || !issueTitle) {
    return res.status(400).json({ error: "Invalid issue title" });
  }

  const foundProject = await prisma.project.findUnique({
    where: {
      name: projectName.trim(),
    },
  });

  if (!foundProject) {
    return res.status(404).json({ error: "Project not found" });
  }

  const foundIssue = await prisma.issue.findFirst({
    where: {
      projectId: foundProject.id,
      title: issueTitle.trim(),
    },
  });

  if (!foundIssue) {
    return res.status(404).json({ error: "Issue not found" });
  }

  return res.status(200).json(foundIssue);
}
