import React from "react";

const TodoBlock = ({ children }) => {
  return (
    <div>
      <div className="todo_block">
        <h1 className="todo_title">TODOLIST</h1>

        {children}
      </div>
    </div>
  );
};

export default TodoBlock;
