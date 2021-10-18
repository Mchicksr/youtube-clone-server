import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'


import User from '../models/user.js'

export const signin = async (req,res) => {
    const {email,password} = req.body
    try {
        const existingUser = await User.findOne({email})
        if(!existingUser) return res.status(404).json({message:"usser doesn't exist"})
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Credentials."})
        const token = jwt.sign({email: existingUser.email, id:existingUser._id},'test',{expiresIn:"1h"})
        res.status(200).json({result:existingUser,token})
        
    } catch (error) {
        res.statuss(500).json({messgae:"Something went wrong"})
    }
}

export const signup = async (req,res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;
    try {
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({message:"user already exist"})
        if(password !== confirmPassword) res.status(400).json({message:"Passwords don't match"})
        const hashedPassword = await bcrypt.hash(password,12)
        const result = await User.create({email,password:hashedPassword, name:`${firstName} ${lastName}`})
        const token = jwt.sign({email:result.email, id:result._id}, 'test',{expiresIn:"1h"})
        res.status(200).json({result,token})   
    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
        console.log(error)
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const updateprofile = async (req,res) => {
    const {id} =req.params
    const {selectedFile} = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedPro = {selectedFile, _id: id };
    await  User.findByIdAndUpdate(id,updatedPro,{new:true})
    res.json(updatedPro)
    
}