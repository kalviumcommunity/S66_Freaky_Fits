import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import image from "../assets/image.png";

export default function LandingPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleEntity=()=>{
    navigate('/add-entity')
  }
  const handleProducts=()=>{
    navigate('/all')
  }
  const handleUsers=()=>{
    navigate('/allusers')
  }
  const handleview=()=>{
    navigate("/all")
  }

  const websiteData = [
    {
      title: "Explore the Quirky World of Fashion",
      description:
        "Welcome to Freaky Fits! Dive into the world of outrageous fashion, where creativity knows no bounds. Our platform celebrates bold, eccentric, and totally unique fashion choices.",
      image: "https://imgk.timesnownews.com/story/Weird_Fashion_Trends.png",
    },
    {
      title: "Create Your Own Outrageous Looks",
      description:
        "Not just a place to explore—it's also a space for YOU to unleash your creativity. Upload your wildest fashion designs and share them with a community that loves to be bold and different!",
      image: "https://i.pinimg.com/474x/b0/6b/bc/b06bbc50f30b91a30d9a795ceb2a8571.jpg",
    },
    {
      title: "Join a Trendsetting Community",
      description:
        "Get inspired by others and be part of a community that thrives on standing out. Share your fits, vote on the most unconventional looks, and make your mark on the fashion world!",
      image: "https://so-sew-easy.com/wp-content/uploads/2016/07/shutterstock_38581672-2.jpg",
    },
    {
      title: "Get Inspired by the Boldest Designers",
      description:
        "From avant-garde designers to everyday fashion rebels, get inspired by those who refuse to conform. Discover eccentric collections and outfits that break the rules.",
      image: "https://imageio.forbes.com/specials-images/dam/imageserve/921610542/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
    },
    {
      title: "Fashion From the Streets",
      description:
        "Street fashion is all about individuality and authenticity. Explore the latest trends from the streets of the world's most fashionable cities, where style knows no limits.",
      image: "https://media.istockphoto.com/id/1005864440/photo/eccentric-young-woman-posing-for-a-portrait.jpg?s=612x612&w=0&k=20&c=WUsNvYBkhRKOuMWNtbHQi_0g_25K4BGheF3HZ1gGcOQ=",
    },
    {
      title: "Unconventional Accessories",
      description:
        "Accessories that push the boundaries of creativity. From bold hats to statement jewelry, discover accessories that challenge the norms of traditional fashion.",
      image: "https://i1142.photobucket.com/albums/n612/chicityfashion/2013/MargielaMasks.jpg",
    },
  ];

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
          <div className="flex space-x-4">
            <button
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition-all hover:shadow-lg"
              onClick={handleClick}
            >
              Signup
            </button>
            <button
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition-all hover:shadow-lg"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition-all hover:shadow-lg"
              onClick={() => {
    localStorage.removeItem("Token");
    alert("You have been logged out!");
    navigate("/");
  }}
            >
              Logout
            </button>
            <button
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition-all hover:shadow-lg"
              onClick={handleEntity}
            >
              Add-Entity
            </button>
            <button
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition-all hover:shadow-lg"
              onClick={handleProducts}
            >
              Products
            </button>
            <button
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition-all hover:shadow-lg"
              onClick={handleUsers}
            >
              All Users
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center pt-32 pb-24 relative z-10 h-150">
        <motion.h1
          className="text-8xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Welcome to Weird Fashion
        </motion.h1>
        <motion.p
          className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Explore the quirkiest, most unconventional fashion trends that redefine creativity and style.
        </motion.p>
      </header>

      {/* About Section */}
      <section className="py-20 px-10 lg:px-24 relative z-10 bg-white/80 backdrop-blur-sm">
        <motion.h2
          className="text-6xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          About the Project
        </motion.h2>
        <motion.p
          className="text-center text-gray-700 max-w-4xl mx-auto text-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Our project showcases the strangest fashion statements that have captivated designers and fashion enthusiasts worldwide. Celebrate the eccentric side of style by engaging with these wild trends!
        </motion.p>
      </section>

      {/* Featured Trends Section */}
      <section className="py-20 relative z-10">
        <motion.h2
          className="text-6xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          What makes it unique?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-10 lg:px-24">
          {websiteData.map((trend, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform"
            >
              <img src={trend.image} alt={trend.title} className="w-full h-72 object-cover" />
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4 text-gray-800">{trend.title}</h3>
                <p className="text-lg text-gray-700 mb-6">{trend.description}</p>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-full w-full transition-all hover:shadow-lg" onClick={handleview}>
                  View Trends
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
}