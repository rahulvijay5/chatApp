import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CurrentTasks from "../components/CurrentTasks";
import ExpiredTasks from "../components/ExpiredTasks";
import Footer from "../components/Footer";
import { useUser } from "../contexts/UserContext";
import { ChevronDown } from "../components/Icons";
import ChangePasswordModal from "../Modals/ChangePasswordModal";

const HomePage = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [view, setView] = useState("default"); // State to manage the current view
  const [showDropdown, setShowDropdown] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
    const [error, setError] = useState("");
  
  const { currentUser, setCurrentUser } = useUser();

  // console.log(currentUser)

  const handleViewChange = (selectedView) => {
    setView(selectedView);
  };

  const handleLogout = () => {
    // Clear user data and token
    setCurrentUser(null);
    localStorage.removeItem("user");

    // Redirect to login page or another page
    navigate("/login"); // Replace '/login' with the path to your login page
  };

  const handleChangePassword = async (data) => {
    // console.log(data);
    try {
      await axios.post(`${baseURL}/auth/changePassword`, {
        userId: data.userId,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      console.log("Password updated successful:");
      setIsChangePasswordModalOpen(false);
      setShowDropdown(false);
    } catch (error) {
      setError(error.response.data.error);
      console.error("Error updating password:", error.response.data.error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-between bg-slate-900">
        {/* Buttons or tabs to switch between views */}
        <div className="flex justify-between bg-slate-900 items-center px-4 flex-col sm:flex-row">
          <div></div>
          <div className="flex py-2 min-w-[16.3rem] items-center justify-between rounded-3xl text-lg">
            <div>
              <button
                className={` ${
                  view === "default"
                    ? "bg-teal-600 hover:bg-teal-700"
                    : "border-2 hover:bg-slate-700"
                } text-white h-10 px-3 rounded-l-xl flex items-center`}
                onClick={() => handleViewChange("default")}
              >
                Current Tasks
              </button>
            </div>
            <div>
              <button
                className={`${
                  view === "beforeToday"
                    ? "bg-teal-600 hover:bg-teal-700"
                    : "border-2 hover:bg-slate-700"
                } text-white h-10 px-3 rounded-r-xl flex items-center`}
                onClick={() => handleViewChange("beforeToday")}
              >
                Expired Tasks
              </button>
            </div>
          </div>
          <div className="text-white">
            <div
              className="flex items-center gap-1 text-lg cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Welcome {currentUser.username.toUpperCase()}
              <button>
                <ChevronDown />
              </button>
            </div>
            {showDropdown && (
              <div className="absolute sm:right-2 mt-2 py-2 bg-slate-700 rounded-md shadow-xl z-20 p-2 flex flex-col gap-1 items-start">
                <button
                  onClick={handleLogout}
                  className="block text-lg text-white w-full hover:bg-slate-500 rounded-xl py-[0.5] px-2"
                >
                  Log Out
                </button>
                <button
                  onClick={() => setIsChangePasswordModalOpen(true)}
                  className="block text-lg text-white w-full hover:bg-slate-500 py-[0.5] rounded-xl px-2"
                >
                  Change Password
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Display the selected view based on the state */}
        {view === "default" && <CurrentTasks />}
        {view === "beforeToday" && <ExpiredTasks />}

        <Footer />
      </div>
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => {
          setIsChangePasswordModalOpen(false);
          setShowDropdown(false);
        }}
        handleSubmit={handleChangePassword}
        error={error}
        setError={setError}
      />
    </>
  );
};

export default HomePage;
