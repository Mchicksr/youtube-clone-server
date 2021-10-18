import express from'express'
import {signin,signup,updateprofile,getUser} from '../controllers/user.js'

const router = express.Router()
router.post('/signin',signin)
router.post('/signup',signup)
router.get('/',getUser)
router.patch('/:id/profile',updateprofile)
export default router