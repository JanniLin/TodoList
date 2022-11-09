import React from "react";

const RecycleBin = ({ openBin }) => {
  return (
    <div className="bin">
      <button className="btn_bin" onClick={openBin}>
        BIN
      </button>
    </div>
  );
};

export default RecycleBin;
