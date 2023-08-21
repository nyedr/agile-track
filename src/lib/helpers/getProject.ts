import { prisma } from "@/lib/prismadb";

export const getUserProjectsById = async (userId: string) => {
  const fetchProjectsResponse = await fetch(
    `/api/projectMembers/${userId}/projects`
  );
  const projects = await fetchProjectsResponse.json();

  return projects;
};

export const getProjectByName = async (name: string) => {
  const projectData = await fetch(`/api/projects/${name}`);
  const project = await projectData.json();

  return project;
};
