import { useSelector } from "react-redux";

// RTK query hooks.
import { useGetTasksQuery } from "../../redux/features/tasks/tasksAPI";

// react components.
import Task from "./Task";
import Error from "../ui/Error";
import Message from "../ui/Message";

const TaskList = () => {
  const { data: tasks, isLoading, isError } = useGetTasksQuery();
  const { search, selected } = useSelector((state) => state.filters);

  const filterByProject = (t) => {
    return selected.includes(t?.project?.projectName);
  };

  const filterBySearch = (task) => {
    return task?.taskName?.toLowerCase().includes(search.toLowerCase());
  };

  const filteredTasks = tasks?.filter(filterByProject)?.filter(filterBySearch);

  return (
    <div className="lws-task-list">
      {isLoading && <Message message={"Loading..."} />}

      {!isLoading && isError && <Error message={"Failed To Fetch ☹"} />}

      {!isLoading && !isError && !filteredTasks.length && (
        <Message message={"No Task Found 👻"} />
      )}

      {filteredTasks?.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
