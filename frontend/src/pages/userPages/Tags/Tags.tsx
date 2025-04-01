import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tag from "../../../components/Tag/Tag";
import PageHeader from "../PageHeader";
import Layout from "../../../components/Layout/Layout";
import { fetchTags, deleteTag } from "../../../services/tagService";

interface TagData {
  id: number;
  name: string;
  color: string;
}

const Tags = () => {
  const [tags, setTags] = useState<TagData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTags = async () => {
      try {
        const tags = await fetchTags();
        setTags(tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTags();
  }, []);

  const handleDelete = async (tagId: number) => {
    try {
      await deleteTag(tagId); // Chama o serviço para deletar a tag
      setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId)); // Atualiza o estado local
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  const handleUpdate = (tagId: number) => {
    navigate(`/update-tag/${tagId}`); // Redireciona para a página de atualização
  };

  const handleCreateTag = () => {
    navigate("/new-tag"); // Redireciona para a página de criação
  };

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen p-4">
        {loading ? (
          <p>Loading...</p>
        ) : tags.length > 0 ? (
          <>
            <PageHeader onCreate={handleCreateTag} />
            <div className="grid sm:grid-cols-4 sm:gap-6 grid-cols-2 gap-2 w-full max-w-4xl">
              {tags.map((tag) => (
                <Tag
                  id={tag.id}
                  key={tag.id}
                  name={tag.name}
                  color={tag.color}
                  onDelete={handleDelete} // Passa o callback de exclusão
                  onUpdate={handleUpdate} // Passa o callback de atualização
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-lg text-gray-700 mb-4">
              Você ainda não possui nenhuma tag. Que tal criar uma agora?
            </p>
            <button
              onClick={handleCreateTag}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
            >
              Criar Nova Tag
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tags;
