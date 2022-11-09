import React from "react";

const TodoItem = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid black",
        padding: "5px",
        margin: "3px",
      }}
    >
      <span
        className="todo_item"
        style={{ textDecorationLine: props.checked ? "line-through" : "" }}
      >
        {props.todoText}{" "}
      </span>
      <div>
        <input
          name="checkbox"
          type="checkbox"
          checked={props.checked}
          onChange={props.onChecked.bind(null, props.id)}
        />
        <button
          className="delete"
          name="delete"
          onClick={() => {
            props.onDelete(props.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
