import { Project } from "@prisma/client";

const Project = ({
  name,
  description,
  endDate,
  status,
  projectManagerId,
}: Project) => {
  return (
    <div className="project">
      <h1>{name}</h1>
      <p>{description}</p>
      <p>{endDate?.toDateString()}</p>
      <p>{status}</p>
    </div>
  );
};

export default Project;
