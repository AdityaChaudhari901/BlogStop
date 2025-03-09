'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '@/Assets/assets';

const Page = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        title: '',
        description: '',
        category: 'Startup',
        author: 'Alex Bennett',
        authorImg: '/author_img.png',
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!image) {
            toast.error("Please upload a blog thumbnail.");
            return;
        }

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append('authorImg', data.authorImg);
        formData.append('image', image);

        try {
            const response = await axios.post('/api/blog', formData);

            if (response.data.success) {
                toast.success(response.data.msg || 'Blog added successfully!');
                setData({
                    title: '',
                    description: '',
                    category: 'Startup',
                    author: 'Alex Bennett',
                    authorImg: '/author_img.png',
                });
                setImage(null);
            } else {
                toast.error(response.data.msg || 'Error occurred');
            }
        } catch (error) {
            console.error("Error submitting blog:", error);
            toast.error('Failed to submit blog');
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='pt-3 px-3 sm:pt-8 sm:pl-10'>
            <p className='text-lg font-medium'>Upload Thumbnail</p>
            <label htmlFor="image" className="cursor-pointer inline-block mt-2">
                <Image
                    src={image ? URL.createObjectURL(image) : assets.upload_area}
                    alt="Upload Thumbnail"
                    width={100}
                    height={100}
                    className="rounded border"
                />
            </label>
            <input
                type="file"
                id="image"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
                required
            />

            <p className='text-lg mt-4 font-medium'>Blog Title</p>
            <input
                name="title"
                value={data.title}
                onChange={onChangeHandler}
                type="text"
                placeholder="Type Here"
                className="w-full sm:w-[400px] mt-2 px-3 py-2 border rounded text-sm"
                required
            />

            <p className='text-lg mt-4 font-medium'>Blog Description</p>
            <textarea
                name="description"
                value={data.description}
                onChange={onChangeHandler}
                rows={4}
                placeholder="Write Content Here"
                className="w-full sm:w-[400px] mt-2 px-3 py-2 border rounded text-sm"
                required
            />

            <p className='text-lg mt-4 font-medium'>Blog Category</p>
            <select
                name="category"
                value={data.category}
                onChange={onChangeHandler}
                className="w-40 mt-2 px-3 py-2 border rounded text-sm text-gray-700"
                required
            >
                <option value="">Select Category</option>
                <option value="Startup">Startup</option>
                <option value="Technology">Technology</option>
                <option value="LifeStyle">LifeStyle</option>
            </select>

            <br />
            <button
                type="submit"
                className="mt-6 w-32 h-10 bg-black text-white text-sm rounded hover:bg-gray-800"
            >
                ADD
            </button>
        </form>
    );
};

export default Page;
