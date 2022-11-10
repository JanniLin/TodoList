import React from "react";

const TodoCreator = (props) => {
  return (
    <div>
      <input
        value={props.value}
        name="innerText"
        onChange={props.onChange}
        className="todo_input"
        type="text"
        placeholder="what needs to be done?"
      />
      <button className="plus" onClick={props.onClick}>
        Add
      </button>
    </div>
  );
};

export default TodoCreator;
