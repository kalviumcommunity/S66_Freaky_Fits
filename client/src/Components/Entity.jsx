import React, { useState } from 'react';
import { motion } from 'framer-motion';
import image from '../assets/image.png'; // Ensure you have the image in the correct path
import { useNavigate } from 'react-router-dom';

const Entity = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setImageFile(file);
  // };
  const handlenav=()=>{
    navigate('/all')
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    title,
    description,
    image, 
  };

  try {
    const token = localStorage.getItem("Token");
    if (!token) {
      alert("First, Login Please");
      return;
    }

    const response = await fetch("https://s66-freaky-fits-1.onrender.com/products", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Product created:', data.savedProduct);
      alert('Entity created successfully');
      navigate('/all');
    } else {
      console.error('Failed to create product:', data.message);
    }
  } catch (err) {
    console.log('Error submitting the form:', err);
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
            Add Entity
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-gray-700 text-lg mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter title"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 text-lg mb-2">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter description"
                required
              />
            </div>
             <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 text-lg mb-2">
                Image
              </label>
              <input
                  type="text"
                  id="image"
                  name="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter Image Url"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all hover:shadow-lg" onClick={handlenav}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </form>
        </motion.div>
      </div>
      <footer className="text-center py-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white absolute bottom-0 w-full">
        <p className="text-lg">© 2025 Weird Fashion Trends. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Entity;