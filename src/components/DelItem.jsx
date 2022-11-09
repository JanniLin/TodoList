import React from "react";

const DelItem = (props) => {
  return (
    <div
      style={{
        fontSize: "large",
        border: "1px solid black",
        padding: "10px",
        margin: "5px 10px",
      }}
    >
      <div
        className="del_item"
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "large",
        }}
      >
        {props.todoText}
        <div>
          <button
            className="del_bin"
            onClick={() => {
              props.onRemove(props.id);
            }}
          >
            Delete
          </button>
          <button
            className="reestablish"
            onClick={() => {
              props.onReestab(props.id);
            }}
          >
            Reestablish
          </button>
        </div>
      </div>
    </div>
  );
};

export default DelItem;
