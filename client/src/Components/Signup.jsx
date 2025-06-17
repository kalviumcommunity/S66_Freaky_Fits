import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import image from '../assets/image.png'; 
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate=useNavigate()
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata=new FormData();
    formdata.append("username", input.username);
    formdata.append("email",input.email)
    formdata.append("password",input.password)
  

    try {
      const response = await fetch("https://s66-freaky-fits-1.onrender.com/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if(response.ok){
      const result = await response.json();
      localStorage.removeItem("Token");

      console.log(result); 
      alert("Signup successfully")
      navigate("/login")
      }else{
        const errorResult = await response.json();
        alert(`Signup failed: ${errorResult.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };


  return (
    <div className="relative min-h-screen font-serif bg-gradient-to-br from-pink-50 to-purple-50">
      
      <div className="absolute inset-0 opacity-20">
        <img className="w-full h-full object-cover" src={image} alt="Background" />
      </div>


      <div className="flex items-center justify-center min-h-screen relative z-10">
        <motion.div
          className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-gray-700 text-lg mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={input.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 text-lg mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={input.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-8">
              <label htmlFor="password" className="block text-gray-700 text-lg mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={input.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </form>
          <p className="text-center text-gray-700 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-purple-600 hover:text-pink-600 font-semibold">
              Log In
            </a>
          </p>
        </motion.div>
      </div>
      <footer className="text-center py-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white absolute bottom-0 w-full">
        <p className="text-lg">© 2025 Weird Fashion Trends. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Signup;
