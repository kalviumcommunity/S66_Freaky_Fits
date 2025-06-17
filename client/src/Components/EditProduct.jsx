import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import image from '../assets/image.png'; // Make sure the image path is correct

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({ title: '', description: '', image: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/products`);
        const data = await response.json();
        const product = data.pro.find(p => p._id === id);
        if (product) {
          setProductData({
            title: product.title,
            description: product.description,
            image: product.image
          });
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Product updated!');
        navigate('/all'); // Change to your route for listing products
      } else {
        alert('Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
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
            Edit Product
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-lg mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={productData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter product title"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-lg mb-2">Description</label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter product description"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-lg mb-2">Image URL</label>
              <input
                type="text"
                name="image"
                value={productData.image}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter image URL"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Changes
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

export default EditProduct;
