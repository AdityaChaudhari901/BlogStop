'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SubsTableItem from '@/Components/AdminComponents/SubsTableitem';

const Page = () => {
    const [emails, setEmails] = useState([]);

    const fetchEmails = async () => {
        try {
            const response = await axios.get('/api/email');
            setEmails(response.data.emails || []);
        } catch (error) {
            console.error("Error fetching emails:", error);
        }
    };

    const deleteEmail = async (mongoId) => {
        try {
            const response = await axios.delete('/api/email', {
                params: { id: mongoId }
            });
            if (response.data.success) {
                toast.success(response.data.msg || "Email deleted successfully");
                fetchEmails(); // Refresh the list
            } else {
                toast.error(response.data.msg || "Failed to delete email");
            }
        } catch (error) {
            console.error("Error deleting email:", {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
            toast.error(error.response?.data?.msg || "Server error occurred");
        }
    };

    useEffect(() => {
        fetchEmails();
    }, []);

    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1 className="text-xl sm:text-2xl font-semibold mb-4">All Subscriptions</h1>
            <div className='relative max-w-[600px] h-[80vh] overflow-x-auto border border-gray-400 scrollbar-hide rounded'>
                <table className='w-full text-sm text-gray-700'>
                    <thead className='text-xs text-left uppercase bg-gray-200 text-gray-700'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>Email</th>
                            <th scope='col' className='hidden sm:table-cell px-6 py-3'>Date</th>
                            <th scope='col' className='px-6 py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emails.length > 0 ? (
                            emails.map(item => (
                                <SubsTableItem
                                    key={item._id}
                                    mongoId={item._id}
                                    email={item.email}
                                    date={item.date}
                                    deleteEmail={deleteEmail}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-6 text-gray-500">
                                    No subscriptions found
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
