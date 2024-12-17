import connectDB from "@/lib/config/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import BlogModel from "@/lib/models/BlogModel";

const fs = require("fs");


// Connect to the database
const loadDB = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

loadDB();


//API END POINT TO GET ALL BLOGS
export async function GET(request) {
 
  const blogId = request.nextUrl.searchParams.get("id")
  
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog)
  }
  else{
    const blogs = await BlogModel.find({});
    return NextResponse.json({blogs});
  }
  
  
}


// API Endpoint for Uploading Blogs

export async function POST(request) {
  try {
    const formData = await request.formData();
    const timestamp = Date.now();

    // Extract the image file
    const image = formData.get("image");
    if (!image) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    const path = `./public/${timestamp}_${image.name}`

    // Write the file
    await writeFile(path, buffer);

    // Return the image URL (this can be improved for cloud storage)
    const imgUrl = `/${timestamp}_${image.name}`;
    
    const blogData = {
      title: `${formData.get('title')}`,
      description: `${formData.get('description')}`,
      category: `${formData.get('category')}`,
      author: `${formData.get('author')}`,
      image: `${imgUrl}`,
      authorImg: `${formData.get('authorImg')}`,
    }    

    await BlogModel.create(blogData);
    console.log("Blog Saved");
    

    return NextResponse.json({ success:true, msg: "Blog Added" });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: "File upload failed", details: error.message }, { status: 500 });
  }
}

// Creating API Endpoint to delete blog

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`, ()=>{});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({success:true, msg:"Blog Deleted"})
}