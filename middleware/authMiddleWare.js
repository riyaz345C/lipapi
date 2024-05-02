const  jwt  = require("jsonwebtoken");


const authMiddleWare = (req,res,next)=>{
    const header = req.headers['authorization']
    console.log(header);
    const token = header.split(' ')[1]
    console.log(header);
    if(!token){
        return res.status(401).json({message:'Authentication Error Token Missing'})
    }
    jwt.verify(token,'secret_key',(err,decoded)=>{
        if(err){
           return res.status(403).json({messgae:'Authentication Error Invalid Token'}) 
        }
        req.user = decoded
        console.log(decoded,'i');
        next()
    })
}
// const isAdmin = (req,res,next)=>{
//     if(req.user.role === 'admin'){
//     next()
// }} 
module.exports = authMiddleWare