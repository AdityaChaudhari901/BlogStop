import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Header = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);

    try {
      setIsSubmitting(true);
      const response = await axios.post('/api/email', formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
      } else {
        toast.error("Error: " + response.data.msg);
      }
    } catch (error) {
      console.error("Error during email submission:", error);
      if (error.response) {
        toast.error(`Server Error: ${error.response.data.message || error.response.data}`);
      } else if (error.request) {
        toast.error("No response from the server.");
      } else {
        toast.error("Error during request setup: " + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="inline-block">
          <Image
            src="/assets/logo.png"
            width={180}
            height={60}
            alt="Logo"
            className="w-[130px] sm:w-auto"
          />
        </Link>

        {/* Button */}
        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
          Get Started
          <Image src="/assets/arrow.png" width={20} height={20} alt="Arrow" />
        </button>
      </div>

      <div className='text-center my-8'>
        <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
        <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>
          Stay updated with the latest trends, insights, and innovations. Our blogs cover a wide range of topics to help you learn, grow, and stay ahead. Dive in and enhance your knowledge today!
        </p>
        <form onSubmit={onSubmitHandler} className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]'>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder='Enter Your Email'
            className='pl-4 outline-none py-3 w-full'
          />
          <button
            className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
