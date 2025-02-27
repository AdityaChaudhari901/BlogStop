import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title:{
        type:String,
        requied:true
    },
    description:{
        type:String,
        requied:true
    },
    category:{
        type:String,
        requied:true
    },
    author:{
        type:String,
        requied:true
    },
    image:{
        type:String,
        requied:true
    },
    suthorImg:{
        type:String,
        requied:true
    },
    date:{
        type:Date,
        requied:true,
        default:Date.now()
    }
    
})

const BlogModel = mongoose.model.blog || mongoose.model('blog',Schema);