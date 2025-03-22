import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import api from "../../../services/api";

const UpdateTask = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID da task da URL
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(1);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${id}`);
        const { title, priority, description } = response.data;
        setTitle(title);
        setPriority(priority);
        setDescription(description);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/update-task', { id, title, priority, description });
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Atualizar Task</h1>
        <form
          onSubmit={handleUpdateTask}
          className="flex flex-col w-full max-w-4xl"
        >
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="number"
            placeholder="Prioridade"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded mb-2"
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
          >
            Atualizar Task
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateTask;