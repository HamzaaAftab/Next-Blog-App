'use client'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios'

const BlogList = () => {
  const [menu, setMenu] = useState('All');
  const [blogs, setBlogs] = useState([]);  // Ensure blogs is initialized as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`/api/blog`);
      // Check the structure of the response and adjust accordingly
      if (Array.isArray(response.data)) {
        setBlogs(response.data); // If the response is an array
      } else {
        setBlogs(response.data.blogs); // If the response is an object containing blogs
      }
    } catch (err) {
      setError('Failed to load blogs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <div className="flex justify-center gap-6 my-10 sm:my-8">
        {['All', 'Technology', 'Startup', 'Lifestyle'].map((category) => (
          <button
            key={category}
            onClick={() => setMenu(category)}
            className={`py-1 px-4 rounded-md ${menu === category ? 'bg-black text-white' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading && <p>Loading blogs...</p>}
      {error && <p>{error}</p>}

      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs
            .filter((item) => menu === "All" ? true : item.category === menu)
            .map((item, index) => (
              <BlogItem
                key={index}
                id={item._id}
                image={item.image}
                title={item.title}
                description={item.description}
                category={item.category}
              />
            ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>
    </div>
  );
}

export default BlogList;
