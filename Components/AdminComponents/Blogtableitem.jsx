import Image from 'next/image';
import React from 'react';

const Blogtableitem = ({ authorImg, title, author, date, deleteBlog, mongoId }) => {
  const BlogDate = new Date(date);

  return (
    <tr className='bg-white border-b'>
      <th scope='row' className='flex items-center gap-3 px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
        <div className="w-10 h-10 relative rounded-full overflow-hidden">
          <Image
            src={authorImg || '/assets/profile_icon.png'}
            alt='Author'
            layout="fill"
            objectFit="cover"
          />
        </div>
        <p>{author || "No author"}</p>
      </th>
      <td className='px-6 py-4'>
        {title || "No title"}
      </td>
      <td className='px-6 py-4'>
        {BlogDate.toDateString()}
      </td>
      <td onClick={() => deleteBlog(mongoId)} className='px-6 py-4 cursor-pointer text-red-500'>
        ×
      </td>
    </tr>
  );
};

export default Blogtableitem;
