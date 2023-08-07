import React, { useState } from "react";

const AddColumn = ({ onAddColumn }) => {
  const [columnName, setColumnName] = useState("");

  const handleInputChange = (e) => {
    setColumnName(e.target.value);
  };

  const handleAddColumn = () => {
    if (columnName.trim() !== "") {
      onAddColumn(columnName);
      setColumnName("");
    }
  };

  return (
    <div className="column add-column">
      <input
        type="text"
        value={columnName}
        onChange={handleInputChange}
        placeholder="Enter column name"
      />
      <button onClick={handleAddColumn} className="add-card-button">
        Add Column
      </button>
    </div>
  );
};

export default AddColumn;
