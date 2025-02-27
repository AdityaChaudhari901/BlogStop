'use client'
import { assets, blog_data } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link'; // ✅ Import Link
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';

const Page = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!id) return;

        const blog = blog_data.find(blog => blog.id === Number(id));
        if (blog) {
            setData(blog);
            console.log("Fetched Blog Data:", blog);
        } else {
            console.warn("Blog not found for ID:", id);
        }
    }, [id]);

    if (!data) return <p className="text-center text-lg py-10">Loading...</p>;

    return (
        <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Link href='/'>
                    <Image src={assets.logo} width={180} height={50} alt='Logo' className='w-[130px] sm:w-auto' />
                </Link>  
                <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>
                    Get Started <Image src={assets.arrow} alt="Arrow" width={12} height={12} />
                </button>
            </div>

            <div className='text-center my-24'>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
                <Image className='mx-auto mt-6 border border-white rounded-full' src={data.author_img} width={60} height={60} alt={data.author} />
                <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
            </div>

            <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
                <Image className='border-4 border-white' src={data.image} width={1280} height={720} alt='Blog Image' />
                <h1 className='my-8 text-[26px] font-semibold'>Introduction:</h1>
                <p>{data.description}</p>

                {/** 🔥 Step-wise Content (Avoid repetition) **/}
                {[...Array(4)].map((_, i) => (
                    <div key={i}>
                        <h3 className='my-5 text-[18px] font-semibold'>Step {i + 1}: Self-reflection and Goal setting</h3>
                        <p className='my-3'>Before you can manage your lifestyle, you must have a clear understanding of what to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
                    </div>
                ))}

                <h3 className='my-5 text-[18px] font-semibold'>Conclusion:</h3>
                <p className='my-3'>Managing your lifestyle is a journey that requires commitment and self-awareness. By following this step-by-step approach, you can make meaningful changes.</p>

                {/** 🔗 Social Media Share Section **/}
                <div className='my-24'>
                    <p className='text-black font-semibold my-4'>Share this article on social media</p>
                    <div className='flex gap-4 items-center'>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <Image src={assets.facebook_icon} alt='Facebook' width={50} className="cursor-pointer" />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <Image src={assets.twitter_icon} alt='Twitter' width={50} className="cursor-pointer" />
                        </a>
                        <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
                            <Image src={assets.googleplus_icon} alt='Google Plus' width={50} className="cursor-pointer" />
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Page;
