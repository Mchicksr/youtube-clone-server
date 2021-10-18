import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title:String,
    message:String,
    name:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    photoId:String,
    link:String,
    likes:{
        type:[String],
        default:[]
    },
    dislikes:{
        type:[String],
        default:[]
    },
    subscribe:{
        type:[String],
        default:[]
    },
    Published:{
        type:Date,
        default:new Date()
    },
    views:{
        type:[String],
        default:[]
    }
})

const PostMessage = mongoose.model('PostVideo',postSchema)

export default PostMessage