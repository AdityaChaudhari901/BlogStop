import mongoose from "mongoose";

export const ConnectDB = async () =>{
    await mongoose.connect('mongodb+srv://adityamsn11:Aditya71@cluster0.nqibj.mongodb.net/blogstop')

    console.log("DB Connected");
    
}