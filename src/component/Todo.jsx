import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import img from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const inputRef = useRef();

  const add = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      const inputText = inputRef.current.value.trim();
      if (inputText === "") {
        Swal.fire({
          title: "Empty Task",
          text: "Please enter a task",
          icon: "warning",
          confirmButtonColor: "#FF9800",
        });
        return null;
      }
      const newTodo = {
        id: Date.now(),
        text: inputText,
        isCompleted: false,
      };
      setTodoList((prev) => [...prev, newTodo]);
      inputRef.current.value = "";

      Swal.fire({
        title: "Task Added!",
        text: "Your task has been added successfully",
        icon: "success",
        confirmButtonColor: "#FF9800",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const deleteTodo = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTodoList((prev) => prev.filter((todo) => todo.id !== id));
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  };

  const toggle = (id) => {
    setTodoList((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };

          // Sweet Alert for task completion status change
          const message = updatedTodo.isCompleted
            ? "Task completed!"
            : "Task marked as incomplete";
          const icon = updatedTodo.isCompleted ? "success" : "info";

          Swal.fire({
            title: message,
            icon: icon,
            confirmButtonColor: "#FF9800",
            timer: 1000,
            showConfirmButton: false,
            position: "top-end",
            toast: true,
          });

          return updatedTodo;
        }
        return todo;
      });
    });
  };

  const editTodo = (id, newText) => {
    if (newText.trim() === "") {
      Swal.fire({
        title: "Empty Task",
        text: "Task cannot be empty",
        icon: "error",
        confirmButtonColor: "#FF9800",
      });
      return;
    }

    setTodoList((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          Swal.fire({
            title: "Task Updated!",
            text: "Your task has been updated successfully",
            icon: "success",
            confirmButtonColor: "#FF9800",
            timer: 1500,
            showConfirmButton: false,
          });
          return { ...todo, text: newText };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white w-[95%] max-w-md mx-auto flex flex-col px-5 py-6 sm:p-7 min-h-[550px] rounded-xl shadow-xl">
      <div className="flex items-center gap-2 mt-4 sm:mt-7">
        <img src={img} alt="todo logo" className="w-7 sm:w-8" />
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          To Do List
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center my-6 sm:my-7 bg-gray-100 rounded-xl p-2 sm:p-0 shadow-inner">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-12 sm:h-14 px-4 placeholder:text-slate-500 text-base sm:text-lg"
          type="text"
          placeholder="Enter Task"
          onKeyDown={add}
        />
        <button
          onClick={add}
          className="w-full sm:w-32 h-12 sm:h-14 text-white text-lg font-medium rounded-xl sm:rounded-full bg-orange-500 hover:bg-orange-600 transition-colors shadow-md"
        >
          Add +
        </button>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[400px] pr-1">
        {todoList.length === 0 ? (
          <div className="text-center text-gray-500 mt-10 text-sm sm:text-base">
            No tasks added yet
          </div>
        ) : (
          todoList.map((item) => (
            <TodoItems
              key={item.id}
              text={item.text}
              id={item.id}
              isCompleted={item.isCompleted}
              deleteTodo={deleteTodo}
              toggle={toggle}
              editTodo={editTodo}
            />
          ))
        )}
      </div>

      {todoList.length > 0 && (
        <div className="text-sm text-gray-500 mt-4 text-center sm:text-left">
          {todoList.filter((todo) => todo.isCompleted).length} of{" "}
          {todoList.length} tasks completed
        </div>
      )}
    </div>
  );
};

export default Todo;
