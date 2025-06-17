import React, { useEffect, useState, } from 'react';
import { motion } from 'framer-motion';
import image from '../assets/image.png'; 
import { useNavigate } from 'react-router-dom';

const AllEntity = () => {
  const navigate=useNavigate()
  const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/products");
      const data = await response.json();
      if (response.ok) {
        setLoading(false)
        setProducts(data.pro);  
        console.log(data.pro)
      } else {
        console.error('Failed to fetch products');
      }
    } catch (err) {
      console.log('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); 

  const handleDelete=async(id)=>{
    try{
      const response=await fetch(`http://localhost:8080/products/${id}`,{
        method:'DELETE',
      })
      if(response.ok){
        alert('Deleted Successfully')
        setProducts(prev => prev.filter(product => product._id !== id));
      }else {
      console.error("Failed to delete product");
    }

    } catch (err) {
      console.log('Error fetching products:', err);
    }
  }

  return (
    <div className="relative min-h-screen font-serif bg-gradient-to-br from-pink-50 to-purple-50">
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

      {/* Products Section */}
      <section className="py-20 relative z-10">
        <motion.h2
          className="text-6xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          Products
        </motion.h2>
          {loading?(          <div className="flex justify-center items-center h-64">
            <motion.div
              className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </div>
):(<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-10 lg:px-24">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform"
            >
              <img src={product.image} alt={product.title} className="w-full h-72 object-cover" />
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4 text-gray-800">{product.title}</h3>
                <p className="text-lg text-gray-700 mb-6">{product.description}</p>
                <div className="flex items-center space-x-4 mb-6 w-full justify-center">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm m">
                    {product.user.username.charAt(0).toUpperCase()} {/* First letter of the username */}
                  </div>
                  <p className="text-2xl text-gray-700 font-semibold">{product.user.username}</p>
                </div>

                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-full w-full transition-all hover:shadow-lg mb-2 cursor-pointer" onClick={() => navigate(`/edit/${product._id}`)}>
                  Edit
                </button>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-full w-full transition-all hover:shadow-lg cursor-pointer"  onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>)}
        
      </section>

      {/* Footer */}
      <footer className="text-center py-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <p className="text-lg">© 2025 Weird Fashion Trends. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AllEntity;