import { createPortal } from "react-dom";

function Modal({ children, onCloseModal, modalOpen }) {
  if (!modalOpen) return null;
  return createPortal(
    <>
      <div className="modal">{children}</div>
      <div className="overlay" onClick={onCloseModal}></div>
    </>,
    document.getElementById("modal")
  );
}

export default Modal;
