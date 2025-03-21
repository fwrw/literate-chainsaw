import { useState } from "react";
import burgerMenuIcon from "../../assets/burger-menu.svg";
import api from "../../services/api";

interface SandwichButtonProps {
  taskId: number;
  onDelete: (taskId: number) => void; // Callback to notify parent about deletion
}

const SandwichButton: React.FC<SandwichButtonProps> = ({ taskId, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      await api.delete("/tasks", { data: { taskId } }); // Call the backend API to delete the task
      onDelete(taskId); // Notify the parent component about the deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="relative">
      <button className="m-2" onClick={toggleMenu}>
        <img src={burgerMenuIcon} alt="Menu" className="w-6 h-6" />
      </button>

      {isMenuOpen && (
        <div className="absolute m-1 bg-white border border-gray-300 rounded shadow-md p-2">
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => console.log("Update clicked")}
          >
            Update
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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