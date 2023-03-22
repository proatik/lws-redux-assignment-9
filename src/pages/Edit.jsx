import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// RTK query hooks.
import {
  useGetTaskQuery,
  useUpdateTaskMutation,
} from "../redux/features/tasks/tasksAPI";
import { useGetTeamQuery } from "../redux/features/team/teamAPI";
import { useGetProjectsQuery } from "../redux/features/projects/projectsAPI";

// initial form values.
const formValues = {
  taskName: "",
  teamMember: "",
  projectName: "",
  deadline: "",
};

const EditTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [skip, setSkip] = useState(true);
  const [values, setValues] = useState(formValues);

  const { data: team } = useGetTeamQuery();
  const { data: projects } = useGetProjectsQuery();
  const { data: task, isSuccess } = useGetTaskQuery(taskId, { skip });

  const [updateTask, { isSuccess: updated }] = useUpdateTaskMutation();

  const changeHandler = (event) => {
    let { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!task) {
      alert(`Failed to fetch task ${taskId}. Please try again. 🙏`);
      return;
    }

    if (!team || !projects) {
      alert("Failed to fetch team or projects. Please try again. 🙏");
      return;
    }

    const { taskName, teamMember, projectName, deadline } = values;

    const updates = {
      taskName,
      teamMember: team?.find((member) => member.name === teamMember),
      project: projects?.find((project) => project.projectName === projectName),
      deadline,
    };

    updateTask({ id: taskId, task: updates });
    navigate("/");
  };

  useEffect(() => {
    if (taskId) {
      setSkip(false);
    }
  }, [taskId]);

  // set previous velues into the form.
  useEffect(() => {
    if (isSuccess) {
      const oldValues = {
        taskName: task?.taskName,
        projectName: task?.project?.projectName,
        teamMember: task?.teamMember.name,
        deadline: task?.deadline,
      };

      setValues(oldValues);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (updated) navigate("/");
  }, [updated]);

  return (
    <div className="container relative">
      {
        <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
          <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
            Edit Task of Your Team
          </h1>
          <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
            <form className="space-y-6" onSubmit={formSubmitHandler}>
              <div className="fieldContainer">
                <label htmlFor="lws-taskName">Task Name</label>
                <input
                  required
                  type="text"
                  name="taskName"
                  id="lws-taskName"
                  value={values.taskName}
                  onChange={changeHandler}
                  placeholder="Implement RTK Query"
                />
              </div>
              <div className="fieldContainer">
                <label>Assign To</label>
                <select
                  required
                  name="teamMember"
                  id="lws-teamMember"
                  value={values.teamMember}
                  onChange={changeHandler}
                >
                  <option hidden>Select Team Member</option>
                  {team?.map(({ id, name }) => (
                    <option key={id} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="fieldContainer">
                <label htmlFor="lws-projectName">Project Name</label>
                <select
                  required
                  name="projectName"
                  id="lws-projectName"
                  value={values.projectName}
                  onChange={changeHandler}
                >
                  <option hidden>Select Project</option>
                  {projects?.map(({ id, projectName }) => (
                    <option key={id} value={projectName}>
                      {projectName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="fieldContainer">
                <label htmlFor="lws-deadline">Deadline</label>
                <input
                  required
                  type="date"
                  name="deadline"
                  id="lws-deadline"
                  value={values.deadline}
                  onChange={changeHandler}
                />
              </div>
              <div className="text-right">
                <button type="submit" className="lws-submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </main>
      }
    </div>
  );
};

export default EditTask;
