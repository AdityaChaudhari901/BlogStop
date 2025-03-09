import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000]'>
      <Link href={`/blogs/${id}`}>
        <Image
          src={image || "/assets/default_blog.png"} // fallback image if image is undefined
          alt={title || "Blog Image"}
          width={400}
          height={400}
          className='border-b border-black cursor-pointer object-cover'
        />
      </Link>
      <p className='ml-5 mt-5 px-2 inline-block bg-black text-white text-sm rounded-sm'>
        {category || "Uncategorized"}
      </p>
      <div className="p-5">
        <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{title || "Untitled Blog"}</h5>
        <p className='mb-3 text-sm tracking-tight text-gray-700'>
          {description ? `${description.slice(0, 120)}...` : "No description available."}
        </p>
        <Link
          href={`/blogs/${id}`}
          className='inline-flex items-center py-2 font-semibold text-center text-black'
        >
          Read More{' '}
          <Image
            src="/assets/arrow.png"
            className='ml-2'
            alt='Arrow Icon'
            width={12}
            height={12}
          />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
