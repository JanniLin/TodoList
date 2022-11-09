import React from "react";

const Modal = ({ openBin, children }) => {
  return (
    <div className="binIsOpen">
      <button className="btn_close" onClick={openBin}>
        Close
      </button>
      <div>{children}</div>
    </div>
  );
};

export default Modal;
