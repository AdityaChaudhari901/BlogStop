import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className="bg-white border border-black rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col">
      <Link href={`/blogs/${id}`}>
        <Image
          src={image || "/assets/default_blog.png"}
          alt={title || "Blog Image"}
          width={400}
          height={200}
          className="w-full h-52 object-cover"
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <span className="bg-black text-white text-xs px-2 py-1 rounded mb-2 w-fit">{category || "Uncategorized"}</span>
        <h5 className="text-lg font-semibold text-gray-900 mb-2">{title || "Untitled Blog"}</h5>
        <p className="text-sm text-gray-600 mb-4 flex-grow">
          {description ? `${description.slice(0, 100)}...` : "No description available."}
        </p>
        <Link href={`/blogs/${id}`} className="text-sm text-black font-medium hover:underline">
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
