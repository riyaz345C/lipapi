const user = require('../DB/schema')
const get = async(req,res)=>{
    
   try {
    const data = await user.find({})
    console.log(data);
    res.status(200).json({status:'success',param:req.params,query:req.query})
   } catch (error) {
    console.log(error);
   }
}

module.exports={get}