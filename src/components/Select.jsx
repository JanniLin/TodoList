import React from "react";
import { options } from "../constants/options";

const Select = (props) => {
  return (
    <div
      style={{
        marginBottom: "10px",
      }}
    >
      <select
        className="select"
        defaultValue={options[2].label}
        onChange={(event) => {
          const index = event.target.selectedIndex;
          const el = event.target.childNodes[index];
          const id = el.getAttribute("id");
          props.onChange(+id);
        }}
      >
        {options.map((option) => (
          <option id={option.id} key={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
