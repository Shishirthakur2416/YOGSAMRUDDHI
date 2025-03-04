const User = require('../Models/User')
const jwt = require('jsonwebtoken')

//checking user is loggedin or not
exports.isLoggedIn = (req, res, next) => {
     const authHeader = req.headers.authorization;
   const token =  authHeader && authHeader.split(' ')[1]
    try {
        jwt.verify(token,process.env.SECRET, async(err,data)=>{
            if (err) {
                return res.status(401).json({ msg: 'you are not logged in' })
            }
        const UID= data.userId 
        const user = await User.findById(UID)
        if (!user) {
            return res.status(401).json({ msg: 'you are not logged in' })

        }
        req.user = user
        next()

        }) }
    catch (e) {
        console.error(e)
       return res.status(401).json({msg:e})

    }
}


// checking user is editor or not
exports.isEditor = (req, res, next) => {
    if (req.user.userType == 'Editor') {
        next()
    } else {
        return res.status(403).json({ msg: 'User is not Editor' })
    }
}
// checking user is admin or not
exports.isAdmin = (req, res, next) => {
    if (req.user.userType == 'Admin') {
        next()
    } else {
        return res.status(403).json({ msg: 'User is not an Admin' })
    }
}

// check user is editororadmin or not
exports.isEditorOrAdmin = (req, res, next) => {
    if (req.user.userType == 'Editor' || req.user.userType == 'Admin') {
        next()
    } else {
        return res.status(403).json({ msg: 'User is not Editor or Admin' })
    }
}