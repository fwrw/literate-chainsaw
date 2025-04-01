import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import api from "../../../services/api";

interface Tag {
  id: number;
  name: string;
  color: string; // Adiciona a propriedade color
}

const AddTags = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID da tarefa da URL
  const [task, setTask] = useState<{ title: string; description: string; priority: number } | null>(null);
  const [tags, setTags] = useState<number[]>([0]); // Inicializa com um input de tag
  const [userTags, setUserTags] = useState<Tag[]>([]); // Tags disponíveis do usuário
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskAndTags = async () => {
      try {
        // Busca os detalhes da tarefa
        const taskResponse = await api.get(`/tasks/${id}`);
        setTask(taskResponse.data);

        // Busca as tags do usuário
        const tagsResponse = await api.get("/tags");
        setUserTags(tagsResponse.data);
      } catch (error) {
        console.error("Erro ao buscar tarefa ou tags:", error);
      }
    };

    fetchTaskAndTags();
  }, [id]);

  const handleAddTagInput = () => {
    if (tags.length < 3) {
      setTags([...tags, 0]); // Adiciona um novo input de tag com valor inicial 0
    }
  };

  const handleTagChange = (index: number, value: number) => {
    const updatedTags = [...tags];
    updatedTags[index] = value;
    setTags(updatedTags);
  };

  const handleSaveTags = async () => {
    try {
      const formattedTags = tags
        .filter((tagId) => tagId !== 0) // Filtra inputs sem valor selecionado
        .map((tagId) => {
          const tag = userTags.find((t) => t.id === tagId);
          return { name: tag?.name || "", color: tag?.color || "#000000" };
        });

      await api.put("/update-task/", {
        id,
        title: task!.title, // Use o operador "!" para garantir que task não é null
        status: "in progress",
        priority: task!.priority,
        description: task!.description,
        tags: formattedTags,
      });

      navigate("/tasks"); // Redireciona para a lista de tarefas
    } catch (error) {
      console.error("Erro ao salvar tags:", error);
    }
  };

  if (!task) {
    return (
      <Layout>
        <div className="flex flex-col items-center min-h-screen p-4">
          <p>Carregando detalhes da tarefa...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Detalhes da Tarefa</h1>
        <div className="w-full max-w-4xl p-4 border border-gray-300 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
          <p className="text-gray-700 mb-4">{task.description}</p>
          <p className="text-gray-700 mb-4">Prioridade: {task.priority}</p>
        </div>

        <div className="w-full max-w-4xl mt-6">
          <h2 className="text-xl font-bold mb-4">Adicionar Tags</h2>
          {tags.map((tagId, index) => (
            <select
              key={index}
              value={tagId}
              onChange={(e) => handleTagChange(index, Number(e.target.value))}
              className="p-2 border border-gray-300 rounded w-full mb-2"
            >
              <option value={0} disabled>
                Selecione uma tag
              </option>
              {userTags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          ))}
          {tags.length < 3 && (
            <button
              onClick={handleAddTagInput}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 mb-4"
            >
              Adicionar Outra Tag
            </button>
          )}
          <button
            onClick={handleSaveTags}
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600"
          >
            Salvar Tags
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AddTags;