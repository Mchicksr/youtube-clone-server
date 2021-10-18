import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './router/post.js'
import userRoutes from './router/users.js'
import dotenv from 'dotenv'
import config2 from './config2.js'

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
const PORT = process.env.PORT || 5000;
mongoose.connect(config2.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => app.listen(PORT,() => console.log(`server running on port:${PORT}`)))
.catch((error) => console.log(error))