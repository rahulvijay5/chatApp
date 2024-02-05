import { React, useState } from "react";

const DeleteModal = ({ isOpen, onClose, handleDelete }) => {
  const [error, setError] = useState("");

  const handleCombinedClick = (e) => {
    handleDelete();
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Foggy background */}
          <div className="fixed inset-0 bg-gray-800 opacity-60"></div>

          {/* Modal content */}
          <div className="bg-slate-900 p-8 rounded-xl text-lg font-semibold shadow-md z-10 text-white sm:w-[28%] h-1/4 flex flex-col gap-1">
            <p>Are you sure you want to remove this todo?</p>
            <div className="flex gap-2 mt-4">
              <div>
                <button
                  className={`mt-4 p-2 text-white rounded-md bg-teal-600`}
                  onClick={handleCombinedClick}
                >
                  Remove
                </button>
              </div>
              <div>
                <button
                  className="mt-4 p-2 bg-transparent text-white rounded-md"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
