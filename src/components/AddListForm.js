import React, { useState } from "react";

function AddListForm({ onAddList }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Call the onAddList function passed from the parent component
    onAddList(name);

    // Reset the form
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label htmlFor="name" className="block mb-2 font-semibold">
        New List Name:
      </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter list name"
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Add List
      </button>
    </form>
  );
}

export default AddListForm;
