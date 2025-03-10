import Image from 'next/image';
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="w-full min-h-[120px] bg-black py-10 px-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
      {/* Logo Section */}
      <div className="flex justify-center sm:justify-start w-full sm:w-auto mb-4 sm:mb-0">
        <Image src="/assets/logo_light.png" alt="BlogStop Logo" width={160} height={60} />
      </div>

      {/* Text Section */}
      <div className="text-white text-base font-normal w-full sm:w-auto mb-4 sm:mb-0">
        <p>© {year} BlogStop. All rights reserved.</p>
        <p className="mt-1">Created by Aditya Chaudhari</p>
      </div>

      {/* Social Media Links */}
      <div className="flex gap-6">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <Image src="/assets/facebook_icon.png" alt="Facebook" width={50} height={50} className="cursor-pointer" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <Image src="/assets/twitter_icon.png" alt="Twitter" width={50} height={50} className="cursor-pointer" />
        </a>
        <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
          <Image src="/assets/googleplus_icon.png" alt="Google Plus" width={50} height={50} className="cursor-pointer" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
