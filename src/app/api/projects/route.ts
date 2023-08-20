import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prismadb";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  // return all projects
  const projects = await prisma.project.findMany({
    orderBy: {
      id: "desc",
    },
  });

  res.status(200).json(projects);
}
