'use client'
import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from "@/components/Footer";
import axios from 'axios';

const Page = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError("Invalid blog ID");
            setLoading(false);
            return;
        }

        const fetchBlog = async () => {
            try {
                console.log("Fetching blog with ID:", id);
                const response = await axios.get(`/api/blog?id=${id}`);
                
                if (response.data.error) {
                    throw new Error(response.data.error);
                }

                setData(response.data);
                console.log("Fetched Blog Data:", response.data);
            } catch (error) {
                console.error("Error fetching blog:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) return <p className="text-center text-lg py-10">Loading...</p>;
    if (error) return <p className="text-center text-lg py-10 text-red-500">Error: {error}</p>;
    if (!data) return <p className="text-center text-lg py-10 text-red-500">Blog not found.</p>;

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
                {data.authorImg && (
                    <Image className='mx-auto mt-6 border border-white rounded-full' src={data.authorImg} width={60} height={60} alt={data.author} />
                )}
                <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
            </div>

            <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
                <Image className='border-4 border-white' src={data.image} width={1280} height={720} alt='Blog Image' />
                <h1 className='my-8 text-[26px] font-semibold'>Introduction:</h1>
               <div className='blog-content' dangerouslySetInnerHTML={{__html:data.description}}>

               </div>

                {/** 🔥 Step-wise Content **/}
                {[...Array(4)].map((_, i) => (
                    <div key={i}>
                        <h3 className='my-5 text-[18px] font-semibold'></h3>
                        <p className='my-3'></p>
                    </div>
                ))}

                <h3 className='my-5 text-[18px] font-semibold'></h3>
                <p className='my-3'></p>

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

            {/** Full-Width Footer **/}
            <div className="w-full mt-10">
                <Footer />
            </div>
        </div>
    );
};

export default Page;