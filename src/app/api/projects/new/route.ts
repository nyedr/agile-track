import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prismadb";
import { newProjectSchema, NewProject } from "@/lib/validations/projects";
import { z } from "zod";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;

  try {
    const validatedBody: NewProject = newProjectSchema.parse(body);

    const isValidProjectManager = await prisma.user.findUnique({
      where: { id: validatedBody.projectManagerId },
    });

    if (!isValidProjectManager) {
      return res.status(400).json({ message: "Invalid project manager" });
    }

    const newProject = await prisma.project.create({
      data: {
        ...validatedBody,
      },
    });

    return res.status(201).json(newProject);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.issues[0]?.message });
    }

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
