import React, { useEffect, useState } from 'react';
import BlogItem from './BlogItem';
import axios from 'axios';

const BlogList = () => {
  const [menu, setMenu] = useState('All');
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const categories = ['All', 'Technology', 'Startup', 'LifeStyle'];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-10">
    

      

      {/* Category Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setMenu(cat)}
            className={`py-1 px-4 rounded border border-black transition ${
              menu === cat ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs
            .filter((item) =>
              menu === 'All' ? true : item.category?.toLowerCase() === menu.toLowerCase()
            )
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
          <p className="text-center col-span-full text-gray-500">No blogs available.</p>
        )}
      </div>
    </section>
  );
};

export default BlogList;
