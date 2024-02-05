import { React, useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";

const ChangePasswordModal = ({ isOpen, onClose, handleSubmit, error, setError }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const { currentUser } = useUser();

  const data = {
    userId: currentUser.userId,
    oldPassword: formData.oldPassword,
    newPassword: formData.newPassword,
  }

//   console.log(data)

  const handleCombinedClick = (e) => {
    e.preventDefault();
    handleSubmit(data);
    setError("");
    // onClose();
  };

  const handleCancel = () => {
    setError("")
    onClose();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-16 sm:px-0">
          {/* Foggy background */}
          <div className="fixed inset-0 bg-gray-800 opacity-60"></div>

          {/* Modal content */}
          <div className="bg-slate-900 text-lg font-semibold shadow-md z-10 text-white w-full sm:max-w-md p-8 mx-auto rounded-3xl">
            <form className="flex flex-col gap-6">
              <div>
                <div className="mb-4">
                  <label className="block mb-1" htmlFor="password">
                    Old-Password
                  </label>
                  <input
                    id="oldpassword"
                    type="password"
                    name="oldPassword"
                    //   value={formData.password}
                    onChange={handleChange}
                    className="py-2 px-3 border border-gray-300 text-black focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1" htmlFor="password">
                    New-Password
                  </label>
                  <input
                    id="newpassword"
                    type="password"
                    name="newPassword"
                    //   value={formData.password}
                    onChange={handleChange}
                    className="py-2 px-3 border border-gray-300 text-black focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                  />
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-2 ">
                  <button
                    onClick={handleCombinedClick}
                    className="inline-flex items-center justify-center px-4 py-2 bg-teal-900 opacity-75 border border-transparent rounded-md font-semibold capitalize text-white hover:opacity-100 focus:outline-none focus:ring focus:ring-red-200 transition"
                  >
                    Change Password
                  </button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              </div>
              <p className="text-orange-600 font-thin">{error}</p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePasswordModal;
