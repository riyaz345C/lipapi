const getm =(req, res, next)=>{
    console.log(!Object.keys(req.query).length);
    if(!Object.keys(req.query).length){
        console.log('unsuccess',req.query);   
        res.status(201).json({not:'success'})
        return
    }
    
    next()
}
module.exports =getm