import Navigation from "@/components/Navigation";
import { Project } from "@prisma/client";
import { prisma } from "@/lib/prismadb";
import { toast } from "@/ui/toast";
import { redirect } from "next/navigation";

const Project = ({ params: { project } }: { params: { project: string } }) => {
  const getProject = async (): Promise<Project | null> => {
    const foundProject = await prisma.project.findUnique({
      where: {
        name: project,
      },
    });

    if (!foundProject) {
      toast({
        title: "Error",
        message: "That project does not exists.",
        type: "error",
      });

      redirect("/projects");
      return null;
    }

    return foundProject;
  };

  return (
    <Navigation projectName={project}>
      <h1 className="mt-5">Hello world</h1>
    </Navigation>
  );
};

export default Project;
