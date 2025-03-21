import SandwichButton from "./SandwichButton";

interface TaskProps {
  id: number;
  title: string;
  description: string;
  priority: number;
  onDelete: (taskId: number) => void; // Callback to notify parent about deletion
}

const Task: React.FC<TaskProps> = ({ id, title, description, priority, onDelete }) => {
  return (
    <div className="flex flex-col items-center border border-gray-300 rounded-lg shadow-md pb-8">
      <div className="flex justify-end w-full">
        <SandwichButton taskId={id} onDelete={onDelete} />
      </div>

      <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mb-4">
        {priority}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 italic">{description}</p>
      </div>
    </div>
  );
};

export default Task;