import Navigation from "@/components/Navigation";
import { redirect } from "next/navigation";
import { getProjectByName } from "@/lib/helpers/getProject";
import IssueCreationModal from "@/components/IssueCreationModal";

interface ProjectProps {
  params: {
    projectName: string;
  };
}

const Project = async ({ params: { projectName } }: ProjectProps) => {
  // const project = await getProjectByName(projectName);
  // if (!project) redirect("/404");

  return (
    <Navigation projectName={projectName}>
      <h1 className="mt-5">Hello world</h1>
      <IssueCreationModal />
    </Navigation>
  );
};

export default Project;
