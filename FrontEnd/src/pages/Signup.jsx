import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegistration = async () => {
    try {
      const res = await axios.post(`${baseURL}/auth/register`, formData);
      setFormData({
        userName: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      setError(error.response.data.error);
      // console.error("Error adding user:", error.response.data.error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration();
    setError("");
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col justify-center px-12 sm:px-0 items-center">
      <div className="w-full sm:max-w-md p-8 mx-auto bg-slate-700 rounded-3xl">
        <h2 className="mb-12 text-center text-5xl font-extrabold">Sign Up</h2>
        <form className="flex flex-col gap-6">
          <div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="email">
                User-Name
              </label>
              <input
                id="username"
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="py-2 px-3 border border-gray-300 focus:border-red-300 text-black focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="email">
                Email-Address
              </label>
              <input
                id="email"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="py-2 px-3 border border-gray-300 focus:border-red-300 text-black focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="py-2 px-3 border border-gray-300 focus:border-red-300 text-black focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              />
            </div>
            <div className="mt-6">
              <button
                onClick={handleSubmit}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-slate-900 active:bg-slate-900 focus:outline-none focus:bg-slate-900 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
              >
                Sign Up
              </button>
            </div>
          </div>
          <p className="text-orange-600 font-thin">{error}</p>
          <div className="justify-center flex gap-1">
            <p>Have an account?</p>
            <div>
              <Link to="/login" className="underline">
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
