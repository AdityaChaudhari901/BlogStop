'use client'
import Blogtableitem from '@/Components/AdminComponents/Blogtableitem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {

    const [blogs, setBlogs] = useState([]);

    const fetchBlog = async () => {
        try {
            const response = await axios.get('/api/blog');
            setBlogs(response.data.blogs);
        } catch (error) {
            toast.error("Error fetching blogs");
        }
    }

    const deleteBlog = async (mongoId) => {
        try {
            const response = await axios.delete('/api/blog', {
                params: {
                    id: mongoId
                }
            });
            toast.success(response.data.msg);
            fetchBlog();  // Refresh the list of blogs after deletion
        } catch (error) {
            toast.error("Error deleting blog");
        }
    }

    useEffect(() => {
        fetchBlog();
    }, [])

    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1>All blogs</h1>
            <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-sm text-gray-700 uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className='hidden sm:block pr6 py-3'>
                                Author Name
                            </th>
                            <th scope='col' className='hidden py-3'>
                                Blog Title
                            </th>
                            <th scope='col' className='hidden py-3'>
                                Date
                            </th>
                            <th scope='col' className='hidden sm:block pr6 py-3'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((item) => {
                            return (
                                <Blogtableitem
                                    key={item._id}  // Using _id as the unique key
                                    mongoId={item._id}
                                    title={item.title}
                                    author={item.author}
                                    authorImg={item.authorImg}
                                    date={item.date}  
                                    deleteBlog={deleteBlog}  // Passing the delete function to each item
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page
