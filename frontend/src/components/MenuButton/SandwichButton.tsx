import { useState } from "react";
import burgerMenuIcon from "../../assets/burger-menu.svg";
import api from "../../services/api";

interface SandwichButtonProps {
  id: number; // ID of the task or tag
  type: "task" | "tag"; // Defines if it's for tasks or tags
  addTag?: boolean; // Only relevant for tasks
  updateRoute: string; // Route for updating
  deleteRoute: string; // Route for deleting
  onDelete: (id: number) => void; // Callback to notify the parent about deletion
  onToggleStatus?: () => void; // Callback to notify the parent about status change
}

const SandwichButton: React.FC<SandwichButtonProps> = ({
  id,
  type,
  onDelete,
  onToggleStatus,
  addTag = true,
  updateRoute,
  deleteRoute,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleFinishTask = async () => {
    try {
      await api.patch(`/tasks/${id}`, { id }); // Call the API to toggle the task's status
      console.log(`Task ${id} status toggled successfully`);
      if (onToggleStatus) {
        onToggleStatus(); // Atualiza o estado local no componente pai
      }
    } catch (error) {
      console.error(`Error toggling task status for task ${id}:`, error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(deleteRoute, { data: { id } }); // Call the API to delete task or tag
      onDelete(id); // Notify the parent component about the deletion
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  return (
    <div className="relative">
      <button className="m-2" onClick={toggleMenu}>
        <img src={burgerMenuIcon} alt="Menu" className="w-6 h-6" />
      </button>

      {isMenuOpen && (
        <div className="absolute m-1 w-fit bg-white border border-gray-300 rounded shadow-md p-2">
          {type === "task" && (
            <button
              className="block rounded-md w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleFinishTask} // Call the finish task function
            >
              Change status
            </button>
          )}

          <button
            className="block rounded-md w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => (window.location.href = `${updateRoute}/${id}`)}
          >
            Update
          </button>

          {type === "task" && addTag && (
            <button
              className="block rounded-md w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => (window.location.href = `/add-tag/${id}`)}
            >
              Add a Tag
            </button>
          )}

          <button
            className="block rounded-md w-full text-left px-4 py-2 text-sm text-red-900 hover:bg-gray-500 hover:text-white"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default SandwichButton;