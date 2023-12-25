// Modal component

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRoot = document.getElementById("modal-root");
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return isOpen
    ? createPortal(
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm" />
          <div
            className="z-10 w-3/5 p-8 bg-white rounded-md shadow-md"
            ref={modalRef}
          >
            {children}
          </div>
        </div>,
        modalRoot
      )
    : null;
};

export default Modal;
