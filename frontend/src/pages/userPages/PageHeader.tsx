import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

interface PageHeaderProps {
  onCreate: () => void; // Função para o botão "Criar Nova Task"
  onSearch?: (query: string) => void; // Função para filtrar tasks pelo nome da tag
}

const PageHeader: React.FC<PageHeaderProps> = ({ onCreate, onSearch }) => {
  const location = useLocation(); // Obtém a rota atual
  const [searchQuery, setSearchQuery] = useState(""); // Estado para o valor da barra de pesquisa

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery); // Chama a função de filtragem com o valor da pesquisa
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mb-4">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <div
            className={`px-4 py-2 rounded-md ${
              location.pathname === "/tasks" ? "bg-blue-100" : ""
            }`}
          >
            <Link
              to="/tasks"
              className={`text-2xl font-bold ${
                location.pathname === "/tasks"
                  ? "text-blue-600" // Estilo para a página ativa
                  : "text-blue-500 hover:text-blue-600"
              }`}
            >
              Minhas Tasks
            </Link>
          </div>
          <span className="border-l border-gray-400 h-8"></span>
          <div
            className={`px-4 py-2 rounded-md ${
              location.pathname === "/tags" ? "bg-blue-100" : ""
            }`}
          >
            <Link
              to="/tags"
              className={`text-2xl font-bold ${
                location.pathname === "/tags"
                  ? "text-blue-600" // Estilo para a página ativa
                  : "text-blue-500 hover:text-blue-600"
              }`}
            >
              Minhas Tags
            </Link>
          </div>
        </div>
        <button
          onClick={() => {
            if (location.pathname === "/tags") {
              window.location.href = "/new-tag";
            } else {
              onCreate();
            }
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
        >
          {location.pathname === "/tags" ? "Criar Nova Tag" : "Criar Nova Task"}
        </button>
      </div>

      {/* Barra de Pesquisa */}
      {location.pathname === "/tasks" && (
        <div className="flex items-center w-full mt-4">
          <input
            type="text"
            placeholder="Pesquisar tasks por tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
          >
            Pesquisar
          </button>
        </div>
      )}
    </div>
  );
};

export default PageHeader;