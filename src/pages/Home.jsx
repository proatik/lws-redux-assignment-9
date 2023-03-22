// react components.
import TaskList from "../components/tasks/TaskList";
import Sidebar from "../components/sidebar/Sidebar";
import AddButton from "../components/tasks/AddButton";

const Home = () => {
  return (
    <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <Sidebar />
        <AddButton />
        <TaskList />
      </main>
    </div>
  );
};

export default Home;
