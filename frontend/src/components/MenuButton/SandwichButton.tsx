import { useState } from "react";
import burgerMenuIcon from "../../assets/burger-menu.svg";

interface SandwichButtonProps {
  id: number; // ID do item (task ou tag)
  type: "task" | "tag"; // Define se é para tasks ou tags
  addTag?: boolean; // Apenas relevante para tasks
  updateRoute: string; // Rota para atualização
  onDelete: () => void; // Callback para exclusão
  onUpdate: () => void; // Callback para atualização
  onAddTag?: () => void; // Callback para adicionar tag (apenas para tasks)
  onToggleStatus?: () => void; // Callback para alterar status (apenas para tasks)
}

const SandwichButton: React.FC<SandwichButtonProps> = ({
  id,
  type,
  addTag = true,
  updateRoute,
  onDelete,
  onUpdate,
  onAddTag,
  onToggleStatus,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button className="m-2" onClick={toggleMenu}>
        <img src={burgerMenuIcon} alt="Menu" className="w-6 h-6" />
      </button>

      {isMenuOpen && (
        <div className="absolute m-1 w-fit bg-white border border-gray-300 rounded shadow-md p-2">
          {type === "task" && onToggleStatus && (
            <button
              className="block rounded-md w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={onToggleStatus}
            >
              Change Status
            </button>
          )}

          <button
            className="block rounded-md w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onUpdate}
          >
            Update
          </button>

          {type === "task" && addTag && onAddTag && (
            <button
              className="block rounded-md w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={onAddTag}
            >
              Add a Tag
            </button>
          )}

          <button
            className="block rounded-md w-full text-left px-4 py-2 text-sm text-red-900 hover:bg-gray-500 hover:text-white"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default SandwichButton;