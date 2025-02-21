import React, { useEffect, useState } from 'react';

const Entity = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);

  // Handle image file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/products");
      const data = await response.json();
      if (response.ok) {
        setProducts(data.pro);  // Assuming data.pro is the correct key for the product list
      } else {
        console.error('Failed to fetch products');
      }
    } catch (err) {
      console.log('Error fetching products:', err);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await fetch("http://localhost:8080/products", {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Product created:', data.savedProduct);
        fetchProducts();  // Refresh product list after creation
      } else {
        console.error('Failed to create product');
      }
    } catch (err) {
      console.log('Error submitting the form:', err);
    }
  };

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);  // Only run once when the component mounts

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-center text-purple-600 mb-6">
          Add Entity
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Image Upload Input */}
            <div>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-4 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            {/* Title Input */}
            <div>
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            {/* Description Input */}
            <div>
              <input
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg hover:from-pink-600 hover:to-purple-600 transition-all hover:shadow-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </form>

        {/* Display the list of products */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">Products</h2>
          <ul>
            {products.map((product, index) => (
              <li key={index} className="mb-4 p-4 bg-white shadow-md rounded-lg">
                <img src={`http://localhost:8080/${product.image}`} alt={product.title} className="w-full h-72 object-cover mb-4" />
                <h3 className="text-xl font-bold text-gray-800">{product.title}</h3>
                <p className="text-gray-700">{product.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Entity;
