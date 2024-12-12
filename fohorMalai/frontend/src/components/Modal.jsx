import React from "react";

const Modal = ({ show, onClose, title, children }) => {
  if (!show) {
    return null; // If 'show' is false, modal won't render
  }

  return (
    <div className="fixed bottom-0 right-0 m-4 p-6 bg-white rounded-lg shadow-lg w-80 z-50">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold text-green-700">{title}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times; {/* Close button */}
        </button>
      </div>
      <div className="mt-4 text-gray-600 text-sm">{children}</div>
    </div>
  );
};

export default Modal;
