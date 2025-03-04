const express= require('express')
const {  registerUser,getOwnProfileData,getAllUsers,updateUserType,deleteUser,updateOwnProfileData,deleteOwnProfileData,loginUser,getOneUser,deleteOneUser,updateOneUser } = require('../Controller/UserController')
const { isAdmin,isLoggedIn} = require('../Middleware/AuthMiddleware')

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)



// for veiwing,updating,deleting self profile 
router.get('/myprofile',isLoggedIn,getOwnProfileData) 
router.get('/allprofile', getAllUsers);

//router.patch('/myProfile',isLoggedIn, updateOwnProfileData)
router.delete('/myProfile',isLoggedIn,deleteOwnProfileData)
//for viewing all user profiles



//for viewing anyones detail expect password..tab use krege jab blog ki profile dekhkr us user ki detail that is profil expect pass word dekhna hoga
router.get('/:id',getOneUser) 
//kisi bhi id lekr use update krskta h i,e admin
router.patch('/:userId', updateUserType);
//kisi bhi id lekr use delete krskta h i,e admin
router.delete('/:id',deleteUser)

module.exports= router
