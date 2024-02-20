import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddListForm() {
  const [name, setName] = useState("");

  const handleAddList = (name) => {
    fetch(`${process.env.REACT_APP_API_URL}/lists/addLists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create list");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("List created successfully");
        window.location.href = "/";

      })
      .catch((error) => {
        console.error("Error creating list:", error);
        toast.error("Failed to create list");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()){
      toast.error("Please enter list name");
      return
    };
    handleAddList(name);
    setName("");
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="mb-4 grid gap-4">
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
        <div className="flex flex-wrap">
          <div className="basis-1/2 p-2">
            <button
              type="submit"
              className="mt-2 bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 focus:outline-none focus:bg-green-600 w-full"
            >
              Add List
            </button>
          </div>
          <div className="basis-1/2 p-2">
          <Link to="/">
            <button className="mt-2 bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 focus:outline-none focus:bg-red-600 w-full">
             Back
            </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddListForm;
