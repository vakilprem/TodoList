import React from "react";
import Todo from "./component/Todo";

const App = () => {
  return (
    <div className="bg-stone-900 grid py-4 min-h-screen">
      <div className="min-h-screen bg-gray-100 flex justify-center items-start py-5 sm:py-10">
        <Todo />
      </div>
    </div>
  );
};

export default App;
