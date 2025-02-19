import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import image from '../assets/image.png';

export default function LandingPage() {

  const [fashionTrends, setFashionTrends] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(response => response.json())
      .then(data => {
        console.log(data.pro); // Log the data for debugging
        setFashionTrends(data.pro); // Updated to use data.pro
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  

  return (
    <div className="relative min-h-screen font-serif bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-20">
        <img className="w-full h-full object-cover" src={image} alt="Background" />
      </div>

      {/* Header Section */}
      <header className="text-center py-24 relative z-10">
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
          Featured Trends
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-10 lg:px-24">
          {fashionTrends.map((trend, index) => (
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
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-full w-full transition-all hover:shadow-lg">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-center py-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <p className="text-lg">© 2025 Weird Fashion Trends. All rights reserved.</p>
      </footer>
    </div>
  );
}
