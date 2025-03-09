import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className="w-full sm:w-[300px] flex flex-col justify-between bg-white border border-black rounded-xl hover:shadow-[-7px_7px_0px_#000000] overflow-hidden min-h-[450px]">
      <Link href={`/blogs/${id}`}>
        <Image
          src={image || "/assets/default_blog.png"}
          alt={title || "Blog Image"}
          width={400}
          height={250}
          className="w-full h-[200px] object-cover"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <p className="inline-block bg-black text-white text-xs px-2 py-1 rounded mb-3 w-fit">
          {category || "Uncategorized"}
        </p>
        <h5 className="text-lg font-semibold mb-2 text-gray-900">
          {title || "Untitled Blog"}
        </h5>
        <p className="text-sm text-gray-600 mb-4 flex-grow">
          {description ? `${description.slice(0, 120)}...` : "No description available."}
        </p>
        <Link
          href={`/blogs/${id}`}
          className="text-sm font-medium text-black inline-flex items-center hover:underline"
        >
          Read More
          <Image
            src="/assets/arrow.png"
            alt="Arrow Icon"
            width={12}
            height={12}
            className="ml-2"
          />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
