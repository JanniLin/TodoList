import React from "react";

const Search = (props) => {
  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="search"
        onChange={props.onSearch}
      />
    </div>
  );
};

export default Search;
