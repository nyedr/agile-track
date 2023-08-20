import { prisma } from "@/lib/prismadb";

interface GetProjectOptions {
  projectName: string;
  isMulti?: boolean;
  orderBy?: "name" | "createdAt" | "updatedAt" | "status";
  orderDirection?: "asc" | "desc";
}

const getProject = async ({
  projectName,
  isMulti,
  orderBy,
  orderDirection,
}: GetProjectOptions) => {
  const projects = await prisma.project.findMany({
    where: {
      name: {
        contains: projectName,
        mode: "insensitive",
      },
    },
    orderBy: {
      [orderBy ?? "name"]: orderDirection ?? "asc",
    },
  });

  if (isMulti) {
    return projects;
  }

  return projects[0];
};

export default getProject;
