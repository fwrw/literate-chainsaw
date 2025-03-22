import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import api from "../../../services/api";

const UpdateTag = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID da tag da URL
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const response = await api.get(`/tags/${id}`); // Faz a requisição para buscar a tag pelo ID
        const { name, color } = response.data;
        setName(name);
        setColor(color);
      } catch (error) {
        console.error("Error fetching tag:", error);
      }
    };

    fetchTag();
  }, [id]);

  const handleUpdateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/update-tag/`, { id, name, color });
      navigate("/tags");
    } catch (error) {
      console.error("Error updating tag:", error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Atualizar Tag</h1>
        <form
          onSubmit={handleUpdateTag}
          className="flex flex-col w-full max-w-4xl"
        >
          <input
            type="text"
            placeholder="Nome da Tag"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-2"
          />
          <label className="mb-2 text-gray-700">
            Escolha uma cor:
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="ml-2"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
          >
            Atualizar Tag
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateTag;