'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
    const [image, setImage] = useState(null);

    const [data,setData] = useState({
    title:'',
    description:'',
    category:'Startup',
    author:'Alex Bennett',
    authorImg:'/author_img.png'
})

const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
    console.log(data);
    
}

const onSubmitHandler = async (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('title',data.title);
    formData.append('description',data.description);
    formData.append('category',data.category);
    formData.append('author',data.author);
    formData.append('authorImg',data.authorImg);
    formData.append('image',image);
    const response = await axios.post('/api/blog',formData);
    if(response.data.success){  
        toast.success(response.data.msg);
        setImage(false);
        setData({
            title:'',
            description:'',
            category:'Startup',
            author:'Alex Bennett',
            authorImg:'/author_img.png'
        });

    }else{
        toast.error('Error');
    }
}

    return (
        <>
            <form onSubmit={onSubmitHandler} className='pt-3 px-3 sm:pt-8 sm:pl-10'>
                <p className='text-lg'>Upload Thumbnail</p>
                <label htmlFor="image" className="cursor-pointer">
                    <Image 
                        className='mt-2' 
                        src={!image ? assets.upload_area : URL.createObjectURL(image)} 
                        width={100}  // ✅ Reduced size
                        height={50}  // ✅ Reduced size
                        alt="Upload Thumbnail" 
                    />
                </label>
                <input 
                    onChange={(e) => setImage(e.target.files[0])} 
                    type='file' 
                    id='image' 
                    className="hidden" 
                    required 
                /> 

                <p className='text-lg mt-3'>Blog Title</p>
                <input
                    name='title' onChange={onChangeHandler} value={data.title}
                    className='w-full sm:w-[400px] mt-2 px-3 py-2 border text-sm' // ✅ Reduced width & padding
                    type="text" 
                    placeholder='Type Here' 
                    required 
                />

                <p className='text-lg mt-3'>Blog Description</p>
                <textarea 
                    name='description' onChange={onChangeHandler} value={data.description}
                    className='w-full sm:w-[400px] mt-2 px-3 py-2 border text-sm' // ✅ Reduced width & padding
                    placeholder='Write Content Here' 
                    rows={4} // ✅ Reduced height
                    required 
                />

                <p className='text-lg mt-3'>Blog Category</p>
                <select 
                    name="Category" onChange={onChangeHandler} value={data.category}
                    className='w-32 mt-2 px-3 py-2 border text-gray-500 text-sm' // ✅ Reduced width & font size
                    required 
                >
                    <option value="">Select Category</option>
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="LifeStyle">LifeStyle</option>
                </select>

                <br />
                <button type='submit' className='mt-6 w-32 h-10 bg-black text-white text-sm'>ADD</button> 
               
            </form> 
        </>
    );
}

export default Page;
