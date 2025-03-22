import { useState } from "react";
import SandwichButton from "../MenuButton/SandwichButton";

interface Tag {
  id: number;
  name: string;
  color: string;
}

interface TaskProps {
  id: number;
  title: string;
  description: string;
  priority: number;
  status: "in progress" | "finished"; // Adiciona o status da tarefa
  Tags: Tag[]; // Array de objetos de tags associadas à tarefa
  onDelete: (taskId: number) => void; // Callback para notificar o pai sobre a exclusão
}

const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  priority,
  status: initialStatus,
  Tags,
  onDelete,
}) => {
  const [status, setStatus] = useState<"in progress" | "finished">(initialStatus);

  // Define a cor do card com base no status
  const cardBackgroundColor =
    status === "in progress" ? "bg-gray-100" : "bg-blue-100";
  const statusTextColor =
    status === "in progress" ? "text-gray-700" : "text-blue-700";

  return (
    <div
      className={`flex flex-col items-center border border-gray-300 rounded-lg shadow-md pb-8 mb-2 w-full max-w-xs ${cardBackgroundColor}`}
    >
      <div className="flex justify-end w-full">
        <SandwichButton
          id={id}
          type="task"
          addTag={true}
          updateRoute="/update-task"
          deleteRoute="/delete-task"
          onDelete={onDelete}
          onToggleStatus={() =>
            setStatus((prevStatus) =>
              prevStatus === "in progress" ? "finished" : "in progress"
            )
          } // Atualiza o estado local do status
        />
      </div>

      <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mb-4">
        {priority}
      </div>

      <div className="text-center px-4">
        <h2 className="text-2xl font-semibold mb-2 break-words">{title}</h2>
        <p className="text-sm text-gray-600 italic">{description}</p>
      </div>

      {/* Exibição do Status */}
      <div className={`mt-4 px-4 py-2 rounded-full text-sm font-semibold ${statusTextColor}`}>
        Status: {status === "in progress" ? "In Progress" : "Finished"}
      </div>

      {/* Renderização das Tags */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {Tags && Tags.length > 0 ? (
          Tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1"
              style={{
                backgroundColor: tag.color,
                color: "#fff",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              {tag.name}
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-sm italic">No Tags available</span>
        )}
      </div>
    </div>
  );
};

export default Task;