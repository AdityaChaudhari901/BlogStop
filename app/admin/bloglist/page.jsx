'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Blogtableitem from '@/Components/AdminComponents/Blogtableitem';

const Page = () => {
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('/api/blog');
            setBlogs(response.data.blogs || []);
        } catch (error) {
            toast.error("Error fetching blogs");
            console.error("Fetch blogs error:", error);
        }
    };

    const deleteBlog = async (mongoId) => {
        try {
            const response = await axios.delete('/api/blog', {
                params: { id: mongoId }
            });

            if (response.data.success) {
                toast.success(response.data.msg || "Blog deleted successfully");
                fetchBlogs(); // Refresh after deletion
            } else {
                toast.error(response.data.msg || "Failed to delete blog");
            }
        } catch (error) {
            toast.error("Error deleting blog");
            console.error("Delete blog error:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1 className="text-xl sm:text-2xl font-semibold mb-4">All Blogs</h1>

            <div className='relative h-[80vh] max-w-[850px] overflow-x-auto border border-gray-400 scrollbar-hide rounded'>
                <table className='w-full text-sm text-gray-700'>
                    <thead className='text-xs text-left uppercase bg-gray-100 text-gray-700'>
                        <tr>
                            <th scope='col' className='px-4 py-3 hidden sm:table-cell'>Author</th>
                            <th scope='col' className='px-4 py-3'>Title</th>
                            <th scope='col' className='px-4 py-3'>Date</th>
                            <th scope='col' className='px-4 py-3 hidden sm:table-cell'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.length > 0 ? (
                            blogs.map((item) => (
                                <Blogtableitem
                                    key={item._id}
                                    mongoId={item._id}
                                    title={item.title}
                                    author={item.author}
                                    authorImg={item.authorImg}
                                    date={item.date}
                                    deleteBlog={deleteBlog}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-6 text-gray-500">
                                    No blogs found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;
