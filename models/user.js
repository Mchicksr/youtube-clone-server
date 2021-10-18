import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    id:{type:String},
    selectedFile:{type:String,default:''}
})

const UserMessage = mongoose.model('User',userSchema)

export default UserMessage;