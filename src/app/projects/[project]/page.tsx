"use client";

import Navigation from "@/components/Navigation";
import { Project } from "@prisma/client";
import { toast } from "@/ui/toast";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Project = ({ params: { project } }: { params: { project: string } }) => {
  const [projectData, setProjectData] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${project}`);
        if (response.ok) {
          const projectJson = await response.json();
          setProjectData(projectJson);
        } else {
          const errorJson = await response.json();
          toast({
            title: "Error",
            message: errorJson.error,
            type: "error",
          });

          redirect("/projects");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [project]);

  return (
    <Navigation projectName={project}>
      <h1 className="mt-5">Hello world</h1>
    </Navigation>
  );
};

export default Project;
