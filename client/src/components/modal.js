import React from "react";

const Modal = (props) => {
  const { closeModal } = props;

  const closeicon = () => (
    <span
      onClick={closeModal}
      style={{
        color: "#000000",
        padding: "10px",
        cursor: "pointer",
        backgroundColor: "transparent",
        border: 0,
        position: "absolute",
        top: "0.3rem",
        right: "0.5rem",
      }}
    >
      <i class="fas fa-times"></i>
    </span>
  );

  return (
    <div className="overlay">
      <div className="content">
        {closeicon()}
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
