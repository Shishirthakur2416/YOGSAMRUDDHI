const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// register
exports.registerUser = async (req, res) => {
    const { username ,email, password,desc } = req.body
    let userType = 'Editor';
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }
        const allUsers= await User.find()
        if(allUsers.length === 0){
            userType = 'Admin';
        }
        const hashedPassword =  await bcrypt.hash(password,10)
    
        const user = new User({username ,email,password: hashedPassword ,desc,userType})
        await user.save()
        return res.status(200).json({ msg: 'New User Created' })
    } catch (e) {
        console.error(e); 
        return res.status(500).json({ msg: 'Problem in creating user' });
    }
}



//login
exports.loginUser = async (req, res) => {
    const { username , password } = req.body
    try {
        const user = await User.findOne({username});

        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        else{
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                const token = jwt.sign({userId:user._id},process.env.SECRET,{expiresIn:"1d"})
            return res.json({msg:'logged in successfully', token})               
            }
            else{
                return res.status(400).json({ msg: "Invalid credentials" });
            }           
        }
    } catch (e) {
        return res.status(500).json({ msg: 'register first user does not exist' })
    }
}



//get any one user data
exports.getOneUser = async(req,res)=>{
    try{
        const id = req.params.id;
   const user= await User.findById({id}).select('-password')
   return res.status(200).json(user)
    }
    catch(e){
        res.status(404).json(e)
    }
}



//get own profile data
exports.getOwnProfileData = async(req,res)=>{
    try{
       
   return res.status(200).json({user:req.user})
    }
    catch(e){
        res.status(404).json({msg:'error fetching personal data'})
    }
} 



//delete own profile data OR profile
exports.deleteOwnProfileData = async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.user._id)
        //await Blog.deleteMany({userId:req.user.createdBy})
        return res.status(200).json({msg:"User deleted successfully"})
    }
    catch(e){
        res.status(404).json({msg:'Error in deleting user'})
    }
} 



//update
exports.updateOneUser=  async(req,res)=>{
    try{   
const updatedUser= await User.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true})
 res.status(200).json(updatedUser)
    }
    catch(e){
        res.status(500).json({msg:'can not update user'},e)
    }
}



//delete
exports.deleteOneUser= async(req,res)=>{
    try{
   await User.findByIdAndDelete(req.params.id)
   await Blog.deleteMany({userId : req.params.id})
   res.status(200).json("user deleted successfully")
    }
    catch(e){
        res.status(404).json({msg:"error in deleting user"},e)
    }
}



// Controller to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ user: users });

  } 
  catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
}



// Controller to delete a user by ID
exports.deleteOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const deletedUser = await User.findByIdAndDelete(userId); // Delete the user by ID
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Error deleting user' });
    }
  };



exports.updateUserType = async (req, res) => {
    const userId = req.params.userId;
    const userType  = req.body.userType; // Expecting the new userType in the body
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { userType },
        { new: true } // Return the updated user
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User type updated', user: updatedUser });
    } catch (error) {
      console.error('Error updatinssg user type:', error);
      res.status(500).json({ message: 'Error updating user type' });
    }
  };