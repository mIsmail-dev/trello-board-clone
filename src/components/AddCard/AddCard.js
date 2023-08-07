import React, { useState } from "react";

const AddCard = ({ onAddCard, column }) => {
  const [newCardText, setNewCardText] = useState("");

  const handleInputChange = (e) => {
    setNewCardText(e.target.value);
  };

  const handleAddCard = () => {
    if (newCardText.trim() !== "") {
      onAddCard(column.id, newCardText);
      setNewCardText("");
    }
  };

  return (
    <div>
      <input
        data-testid={`${column.id}-input`}
        type="text"
        value={newCardText}
        onChange={handleInputChange}
        placeholder="Enter card content"
      />
      <button data-testid={column.id} onClick={handleAddCard}>
        Add Card
      </button>
    </div>
  );
};

export default AddCard;
