import express from 'express'
import {getPosts,createPost,updatePost,deletePost,likePost,dislikePost,subscribe} from '../controllers/post.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.get('/',getPosts)
router.post('/',createPost)
router.patch('/:id',updatePost)
router.delete('/:id',deletePost)
router.patch('/:id/likePost',auth,likePost)
router.patch('/:id/dislikePost',auth,dislikePost)
router.patch('/:id/subscribe',subscribe)
export default router