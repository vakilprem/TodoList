import React, { useState, useRef } from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";


const TodoItems = ({ text, id, isCompleted, deleteTodo, toggle, editTodo }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const editInputRef = useRef(null);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    deleteTodo(id);
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (editInputRef.current) {
        editInputRef.current.focus();
        editInputRef.current.select();
      }
    }, 10);
  };

  const saveEdit = () => {
    if (editedText.trim() !== "") {
      editTodo(id, editedText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      setEditedText(text);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between my-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      {isEditing ? (
        <div className="flex-1 flex items-center">
          <img
            className="w-6 h-6 opacity-50"
            src={isCompleted ? tick : not_tick}
            alt={isCompleted ? "Completed" : "Not completed"}
          />
          <input
            ref={editInputRef}
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="ml-4 flex-1 p-1 text-lg bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div className="flex gap-2 ml-2">
            <button
              onClick={saveEdit}
              className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditedText(text);
                setIsEditing(false);
              }}
              className="text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            onClick={() => toggle(id)}
            className="flex flex-1 items-center cursor-pointer"
          >
            <img
              className="w-6 h-6"
              src={isCompleted ? tick : not_tick}
              alt={isCompleted ? "Completed" : "Not completed"}
            />
            <p
              className={`ml-4 text-lg ${
                isCompleted ? "text-gray-400 line-through" : "text-gray-700"
              }`}
            >
              {text}
            </p>
          </div>

          <div className="flex">
            <button
              onClick={handleEdit}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors mr-1"
              title="Edit task"
            >
              <svg
                className="w-4 h-4 opacity-70 hover:opacity-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            {showConfirm ? (
              <div className="flex gap-2">
                <button
                  onClick={confirmDelete}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  Confirm
                </button>
                <button
                  onClick={cancelDelete}
                  className="text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={handleDelete}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                title="Delete task"
              >
                <img
                  src={delete_icon}
                  alt="Delete"
                  className="w-4 h-4 opacity-70 hover:opacity-100"
                />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItems;
