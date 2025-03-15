import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import image from "../assets/image.png"; // Ensure you have the image asset
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate=useNavigate()

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/users");
      const data = await response.json();
      if (data) {
        setUsers(data.users);
        console.log(data.users);
      } else {
        console.log("Error fetching users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleview=(id)=>{
    navigate(`/viewpost/${id}`)

  }

  return (
    <div className="relative min-h-screen font-serif bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img className="w-full h-full object-cover" src={image} alt="Background" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Freaky Fits
          </motion.h1>
        </div>
      </nav>

      {/* Users Section */}
      <section className="py-28 relative z-10">
        <motion.h2
          className="text-6xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          All Users
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-10 lg:px-24">
          {users.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform"
            >
              {/* User Avatar */}
              <div className="w-full h-72 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <span className="text-8xl font-bold text-white">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* User Details */}
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4 text-gray-800">{user.username}</h3>
                <p className="text-lg text-gray-700 mb-6">{user.email}</p>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-full w-full transition-all hover:shadow-lg" onClick={()=>handleview(user._id)}>
                  View Posts
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <p className="text-lg">© 2025 Weird Fashion Trends. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AllUsers;