import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-slate-100 h-screen w-28 sm:w-80 border-r border-gray-300'>
      <div className='px-2 sm:pl-14 py-3'>
        <Image src="/assets/logo.png" width={120} height={40} alt='Logo' />
      </div>
      <div className='w-full relative py-12'>
        <div className='w-[50%] sm:w-[80%] absolute right-0 space-y-4'>
          <Link href='/admin/addProduct' className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
            <Image src="/assets/add_icon.png" alt='Add' width={28} height={28} />
            <p>Add Blog</p>
          </Link>
          <Link href='/admin/bloglist' className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
            <Image src="/assets/blog_icon.png" alt='Blog List' width={28} height={28} />
            <p>Blog lists</p>
          </Link>
          <Link href='/admin/subscription' className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
            <Image src="/assets/email_icon.png" alt='Subscriptions' width={28} height={28} />
            <p>Subscriptions</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
