import api from "../services/api";

interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface TaskData {
  id: number;
  title: string;
  description: string;
  priority: number;
  status: "in progress" | "finished";
  Tags: Tag[];
}

// Função para buscar todas as tasks
export const fetchTasks = async (): Promise<TaskData[]> => {
  const response = await api.get("/tasks");
  return response.data.map((task: any) => ({
    ...task,
    Tags: task.Tags.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
    })),
  }));
};

export const updateTaskStatus = async (
  taskId: number,
): Promise<void> => {
  await api.patch(`/tasks/${taskId}`);
};

// Função para deletar uma task
export const deleteTask = async (taskId: number): Promise<void> => {
  await api.delete(`/delete-task`, {
    data: { id: taskId },
  });
};