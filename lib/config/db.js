import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://adityamsn11:Flatronw1942t@cluster0.nqibj.mongodb.net/blogstop')
    console.log("DB Connected");
    
}