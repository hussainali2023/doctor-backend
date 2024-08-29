const jwt = require("jsonwebtoken")

exports.authMiddleware = (req, res, next) =>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decode.id;
        next()
    }
    catch(error){
        res.status(403).json({message:"Forbidden"})
    }
}