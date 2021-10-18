import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './router/post.js'
import userRoutes from './router/users.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.use('/posts',postRoutes)
app.use('/user',userRoutes)
app.get('/',(req,res)=> {
    res.send('Welcome to TalentTube')
})
const CONNECTION_URL = 'mongodb+srv://codeCosmic:codeCosmic1234@cluster0.p2hqg.mongodb.net/youtube-clone?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => app.listen(PORT,() => console.log(`server running on port:${PORT}`)))
.catch((error) => console.log(error))