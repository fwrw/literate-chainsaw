import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css"; // Importa o componente Masonry
import PageHeader from "../PageHeader";
import Layout from "../../../components/Layout/Layout";
import Task from "../../../components/Task/Task";
import api from "../../../services/api";

interface Tag {
  id: number;
  name: string;
  color: string;
}

interface TaskData {
  id: number;
  title: string;
  description: string;
  priority: number;
  status: "in progress" | "finished";
  Tags: Tag[];
}

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]); // Todas as tasks
  const [filteredTasks, setFilteredTasks] = useState<TaskData[]>([]); // Tasks filtradas
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        const tasksWithTags = response.data.map((task: any) => ({
          ...task,
          Tags: task.Tags.map((tag: any) => ({
            id: tag.id,
            name: tag.name,
            color: tag.color,
          })),
        }));
        setTasks(tasksWithTags);
        setFilteredTasks(tasksWithTags); // Inicialmente, todas as tasks são exibidas
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
    setFilteredTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  };

  const handleCreateTask = () => {
    navigate("/new-task");
  };

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();

    // Se a pesquisa estiver vazia, exibe todas as tasks
    if (!lowerCaseQuery.trim()) {
      setFilteredTasks(tasks);
      return;
    }

    // Filtra as tasks com base no nome da tag
    const filtered = tasks.filter((task) =>
      task.Tags.some((tag) => tag.name.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredTasks(filtered);
  };

  // Configuração do layout de masonry
  const breakpointColumnsObj = {
    default: 4, // Número de colunas padrão
    1100: 3, // 3 colunas para telas menores que 1100px
    700: 2, // 2 colunas para telas menores que 700px
    500: 1, // 1 coluna para telas menores que 500px
  };

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <PageHeader onCreate={handleCreateTask} onSearch={handleSearch} />
            {filteredTasks.length > 0 ? (
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex w-full max-w-4xl gap-2"
                columnClassName="masonry-column"
              >
                {filteredTasks
                  .sort((a, b) => b.priority - a.priority)
                  .map((task) => (
                    <Task
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      description={task.description}
                      priority={task.priority}
                      status={task.status}
                      Tags={task.Tags}
                      onDelete={handleDelete}
                    />
                  ))}
              </Masonry>
            ) : (
              <p className="text-lg text-gray-700 mt-4">
                Nenhuma task encontrada para a tag pesquisada.
              </p>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Tasks;
