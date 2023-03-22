import { Fragment } from "react";

import "./style.css";

// react components.
import ProjectSkeleton from "./ProjectSkeleton";

const ProjectsSkeleton = () => {
  const projects = [1, 2, 3, 4, 5, 6];

  return (
    <Fragment>
      {projects.map((project) => (
        <ProjectSkeleton key={project} />
      ))}
    </Fragment>
  );
};

export default ProjectsSkeleton;
