import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import api from "../../../services/api";

const NewTask = () => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState(1);
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/tasks", { title, priority, description });
            navigate("/tasks");
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return (
        <Layout>
            <div className="flex flex-col items-center min-h-screen p-4">
                <h1 className="text-2xl font-bold mb-4">Nova Task</h1>
                <form
                    onSubmit={handleCreateTask}
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
                        Criar Task
                    </button>
                </form>
            </div>
        </Layout>
    );

};

export default NewTask;