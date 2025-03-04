const express= require('express')
const multer = require('multer')
const path= require('path')

const { createBlog ,readAllBlog,readUsersAllBlog,readOneBlog,deleteOneBlog,updateOneBlog } = require('../Controller/BlogController')
const { isEditorOrAdmin ,isLoggedIn} = require('../Middleware/AuthMiddleware')

const router = express.Router()

const storage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/blogs')
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); 
      cb(null,file.originalname+'-'+uniqueSuffix+path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})
router.post('/',upload.single('blogImg'),isLoggedIn, isEditorOrAdmin,createBlog)
router.get('/',readAllBlog)// sabhi k sare blogs dekhne k liye

router.get('/myblogs',isLoggedIn,readUsersAllBlog) // sirf khudke sare blogs dekhne k liye

router.get('/:slug',readOneBlog)
router.patch('/:slug',upload.single('blogImg'), isLoggedIn, isEditorOrAdmin, updateOneBlog)
router.delete('/:slug',isLoggedIn, isEditorOrAdmin,deleteOneBlog)

module.exports= router


