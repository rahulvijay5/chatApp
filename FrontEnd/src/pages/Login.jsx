import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  // const baseURL = import.meta.env.VITE_API_BASE_URL;
  const baseURL = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [error, setError] = useState("")

  const { setCurrentUser } = useUser();

  // console.log(formData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    console.log("Base URL:", import.meta.env.VITE_API_BASE_URL);
    try {
      const res = await axios.post(`${baseURL}/auth/login`, formData);
      if (res.data) {
        // const decoded = jwt_decode(res.data.token);
        const decoded = jwtDecode(res.data.token);
        setCurrentUser({
          userId: decoded.userId,
          username: decoded.username,
          token: res.data.token,
        });
      }
      // console.log(res.data);
      setFormData({
        userName: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      setError(error.response.data.error);
      console.error("Error logging in:", error.response.data.error);
      console.log(error)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    setError("");
  };



  return (
    <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center px-12 sm:px-0">
      <div className="w-full sm:max-w-md p-8 mx-auto bg-slate-700 rounded-3xl">
        <h2 className="mb-12 text-center text-5xl font-extrabold">Welcome.</h2>
        <form className="flex flex-col gap-6">
          <div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="username">
                User-Name
              </label>
              <input
                id="username"
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                autoComplete="username"
                className="py-2 px-3 border border-gray-300 text-black focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
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
                autoComplete="current-password"
                className="py-2 px-3 border border-gray-300 text-black focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* <input
                  id="remember_me"
                  type="checkbox"
                  className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm leading-5 text-gray-900"
                >
                  {" "}
                  Remember me{" "}
                </label> */}
              </div>
              <a href="#" className="text-sm">
                {" "}
                Forgot your password?{" "}
              </a>
            </div>
            <div className="mt-4">
              <button
                onClick={handleSubmit}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-slate-900 active:bg-slate-900 focus:outline-none focus:bg-slate-900 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
              >
                Log In
              </button>
            </div>
          </div>
          <p className="text-orange-600 font-thin">{error}</p>
          <div className="justify-center flex gap-1">
            <p>Don't have an account?</p>
            <div>
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
