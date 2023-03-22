import { Fragment } from "react";

// react components.
import TeamMember from "./TeamMemberSkeleton";

const TeamSkeleton = () => {
  const members = [1, 2, 3, 4, 5, 6, 7];

  return (
    <Fragment>
      {members.map((member) => (
        <TeamMember key={member} />
      ))}
    </Fragment>
  );
};

export default TeamSkeleton;
