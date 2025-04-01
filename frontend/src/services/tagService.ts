import api from "../services/api";

export interface TagData {
  id: number;
  name: string;
  color: string;
}

// Função para buscar todas as tags
export const fetchTags = async (): Promise<TagData[]> => {
  const response = await api.get("/tags");
  return response.data;
};

// Função para deletar uma tag
export const deleteTag = async (tagId: number): Promise<void> => {
  await api.delete(`/delete-tag/`, {
    data: { 
      id: tagId
    },
  });
};

