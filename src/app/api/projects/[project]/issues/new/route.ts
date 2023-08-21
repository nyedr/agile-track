import { NextApiRequest, NextApiResponse } from "next";
import { IssueInput, issueSchema } from "@/lib/validations/issues";
import { catchErrors } from "@/lib/utils";
import { prisma } from "@/lib/prismadb";
import { IssueType, Priority, Statuses } from "@prisma/client";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const issueData = req.body as IssueInput;
  const { project: projectName } = req.query;

  try {
    issueSchema.parse(issueData);
  } catch (error) {
    catchErrors(error, res);
  }

  if (typeof projectName !== "string" || !projectName) {
    return res.status(400).json({ error: "Invalid project name" });
  }

  const foundProject = await prisma.project.findUnique({
    where: {
      name: projectName?.trim(),
    },
  });

  if (!foundProject) {
    return res.status(404).json({ error: "Project not found" });
  }

  const issue = await prisma.issue.create({
    data: {
      title: issueData.title,
      description: issueData.description,
      status: issueData.status as Statuses,
      priority: issueData.priority as Priority,
      type: issueData.type as IssueType,
      projectId: foundProject?.id,
      assigneeId: issueData.assigneeId,
      reporterId: issueData.reporterId,
    },
  });

  return res.status(201).json(issue);
}
