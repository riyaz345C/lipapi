const express = require('express')
const router = express.Router()
const authMiddleWare = require('../middleware/authMiddleWare.js')
const User = require('../DB/schema');
const {upload} = require('../middleware/multer')

const isAdmin = (req,res,next)=>{
    if(req.user.role === 'admin'){
    next()
}}

router.put('/',authMiddleWare,isAdmin,upload.any(), async(req,res)=>{
try {
    let postdata = JSON.parse(req.body.postdata)
    let len = req.files.length - 1
    let data = {
        ...postdata,
        projectsAmmenities:postdata.projectsAmmenities.map((e,i)=>({
            id:e.id,
            img:req.query.projectname.split(' ').join('-')+'--'+
            req.files[i].fieldname+
            '.'+req.files[i].originalname.split('.').pop(),
            content:e.content
        })),
        projectPlan:req.query.projectname.split(' ').join('-')+'--'+
        req.files[len - 1].fieldname+
        '.'+req.files[len - 1].originalname.split('.').pop()
    }
    // let dirnames = req.dirnames
    // console.log( req.params.id,
        // {
        //     ...postdata,
        //     projectsAmmenities:postdata.projectsAmmenities.map((e,i)=>({
        //         id:e.id,
        //         img:req.query.projectname.split(' ').join('-')+'--'+
        //         req.files[i].fieldname+
        //         '.'+req.files[i].originalname.split('.').pop(),
        //         content:e.content
        //     })),
        //     projectPlan:req.query.projectname.split(' ').join('-')+'--'+
        //     req.files[len - 1].fieldname+
        //     '.'+req.files[len - 1].originalname.split('.').pop()
        // }
    // );
    let status = await User.updateOne({
        "projects.$.projectName" : req.params.id
    },{
        $set: data
    })
    console.log("lip",status,'lip')
    res.status(200).json({message:'done'})
} catch (error) {
    console.log(error);
}
})

module.exports = router