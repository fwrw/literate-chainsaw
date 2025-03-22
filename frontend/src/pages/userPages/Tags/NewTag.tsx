import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import api from "../../../services/api";

const NewTag = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000"); // Cor padrão inicial

  const navigate = useNavigate();

  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/tags", { name, color });
      navigate("/tags");
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Nova Tag</h1>
        <form
          onSubmit={handleCreateTag}
          className="flex flex-col w-full max-w-4xl"
        >
          <input
            type="text"
            placeholder="Nome da Tag"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-2"
            required
          />
          <label className="mb-2 text-gray-700">
            Escolha uma cor:
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="ml-2"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
          >
            Criar Tag
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default NewTag;