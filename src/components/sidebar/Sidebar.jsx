import { useDispatch, useSelector } from "react-redux";

// RTK actions.
import { changeSelected } from "../../redux/features/filters/filtersSlice";

// RTK query hooks.
import { useGetTeamQuery } from "../../redux/features/team/teamAPI";
import { useGetProjectsQuery } from "../../redux/features/projects/projectsAPI";

// custom hooks.
import useImages from "../../hooks/useImages";

// react components.
import Errorr from "../ui/Errorr";
import TeamSkeleton from "../skeletons/team/TeamSkeleton";
import ProjectsSkeleton from "../skeletons/projects/ProjectsSkeleton";

const Sidebar = () => {
  const getImage = useImages();
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.filters);

  const team = useGetTeamQuery();
  const projects = useGetProjectsQuery();

  const checkboxHandler = (value) => {
    dispatch(changeSelected(value));
  };

  return (
    <div className="sidebar">
      {/* Projects List */}
      <div>
        <h3 className="text-xl font-bold">Projects</h3>
        <div className="mt-3 space-y-4">
          {projects?.isError && <Errorr message={"Failed To Fetch ☹"} />}

          {projects?.isLoading && <ProjectsSkeleton />}

          {projects?.data?.map(({ id, projectName, colorClass }) => (
            <div key={id} className="checkbox-container">
              <input
                type="checkbox"
                className={colorClass}
                checked={selected.includes(projectName)}
                onChange={() => checkboxHandler(projectName)}
              />
              <p className="label">{projectName}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Members */}
      <div className="mt-8">
        <h3 className="text-xl font-bold">Team Members</h3>
        <div className="mt-3 space-y-4">
          {team?.isError && <Errorr message={"Failed To Fetch ☹"} />}

          {team?.isLoading && <TeamSkeleton />}

          {team?.data?.map(({ id, name, avatar }) => (
            <div key={id} className="checkbox-container">
              <img className="team-avater" src={getImage(avatar)} />
              <p className="label">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
