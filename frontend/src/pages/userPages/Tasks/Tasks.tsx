import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import Task from "../../../components/Task/Task";
import api from "../../../services/api";

interface TaskData {
  id: number;
  title: string;
  description: string;
  priority: number;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleCreateTask = () => {
    navigate("/new-task");
  };

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen p-4">
        {loading ? (
          <p>Loading...</p>
        ) : tasks.length > 0 ? (
          <>
            <div className="flex justify-between w-full max-w-4xl mb-4">
              <h1 className="text-2xl font-bold">Minhas Tasks</h1>
              <button
                onClick={handleCreateTask}
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
              >
                Criar Nova Task
              </button>
            </div>
            <div className="grid sm:grid-cols-4 sm:gap-6 grid-cols-2 gap-2 w-full max-w-4xl">
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-lg text-gray-700 mb-4">
              Você ainda não possui nenhuma task. Que tal criar uma agora?
            </p>
            <button
              onClick={handleCreateTask}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
            >
              Criar Nova Task
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tasks;
