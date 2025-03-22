import React from "react";
import SandwichButton from "../MenuButton/SandwichButton";

interface TagProps {
  id: number;
  name: string;
  color: string; // Cor da borda da tag
  onDelete: (tagId: number) => void; // Callback para notificar o pai sobre a exclusão
}

const Tag: React.FC<TagProps> = ({ id, name, color, onDelete }) => {
  return (
    <div
      className="flex items-center justify-between border rounded-lg shadow-md p-4 mb-2"
      style={{ borderColor: color }} // Define a cor da borda
    >
      <span className="text-lg font-semibold" style={{ color }}>
        {name}
      </span>
      <SandwichButton 
        id={id}
        type="tag"
        updateRoute="/update-tag"
        deleteRoute="/delete-tag"
        onDelete={onDelete}
      />
    </div>
  );
};

export default Tag;