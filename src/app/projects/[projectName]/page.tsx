import Navigation from "@/components/Navigation";
import { redirect } from "next/navigation";
import fetchProjects from "@/lib/helpers/getProject";

const Project = async ({
  params: { projectName },
}: {
  params: { projectName: string };
}) => {
  // const project = await fetchProjects({ projectName });
  // if (!project) redirect("/404");

  return (
    <Navigation projectName={projectName}>
      <h1 className="mt-5">Hello world</h1>
    </Navigation>
  );
};

export default Project;
