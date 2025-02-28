import { ConnectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import BlogModel from '@/lib/models/BlogModel';
import { writeFile } from 'fs/promises';

export async function GET(request) {
    await ConnectDB(); // Ensure DB connection

    const blogId = request.nextUrl.searchParams.get("id");

    try {
        if (blogId) {
            const blog = await BlogModel.findById(blogId);
            if (!blog) {
                return NextResponse.json({ error: "Blog not found" }, { status: 404 });
            }
            return NextResponse.json(blog);
        } else {
            const blogs = await BlogModel.find({});
            return NextResponse.json({ blogs });
        }
    } catch (error) {
        console.error("Error fetching blog:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request) {
    await ConnectDB(); // Ensure DB connection

    try {
        const formData = await request.formData();
        const timestamp = Date.now();

        // Handle image upload
        const image = formData.get('image');
        let imgUrl = "";

        if (image) {
            const imageByteData = await image.arrayBuffer();
            const buffer = Buffer.from(imageByteData);
            const path = `./public/${timestamp}_${image.name}`;

            await writeFile(path, buffer);
            imgUrl = `/${timestamp}_${image.name}`;
        }

        const blogData = {
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            author: formData.get('author'),
            image: imgUrl,
            authorImg: formData.get('authorImg'),
        };

        await BlogModel.create(blogData);
        console.log("Blog Saved");

        return NextResponse.json({ success: true, msg: 'Blog Added' });
    } catch (error) {
        console.error("Error saving blog:", error);
        return NextResponse.json({ error: "Failed to save blog" }, { status: 500 });
    }
}
