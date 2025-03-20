import { useEffect, useState } from "react";
import { Layout } from "../../../components";
import api from "../../../services/api";

interface Task {
  id: number;
  title: string;
  description: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Layout>
      <h1>Minhas Tarefas</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma tarefa encontrada.</p>
      )}
    </Layout>
  );
};

export default Tasks;