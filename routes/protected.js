const express = require('express')
const router = express.Router()
const fs = require('fs')
const bcrypt = require('bcrypt')
const path = require('path')
// const user = require('../DB/schema')
const jwt = require('jsonwebtoken')
const User = require('../DB/schema')
const {upload} = require('../middleware/multer')
const authMiddleWare = require('../middleware/authMiddleWare')
// const AuthMiddleWare = (req,res,next)=>{
//     const header = req.headers['authorization']
//     console.log(header);
//     const token = header.split(' ')[1]
//     console.log(header);
//     if(!token){
//         return res.status(401).json({message:'Authentication Error Token Missing'})
//     }
//     jwt.verify(token,'secret_key',(err,decoded)=>{
//         if(err){
//            return res.status(403).json({messgae:'Authentication Error Invalid Token'}) 
//         }
//         req.user = decoded
//         console.log(decoded,'i');
//         next()
//     })
// }
const isAdmin = (req,res,next)=>{
    if(req.user.role === 'admin'){
    next()
}
}
router.get('/',authMiddleWare,async(req,res)=>{
    try {
    // fetch product list
    // img,name,id
    const productlist = await User.find({},{projects:1})
    console.log(productlist);
    res.status(200).json({messgae:'protected route acessed successfully',data:productlist})
    } catch (error) {
        console.log(error);
    }
})

router.post('/',authMiddleWare,isAdmin,upload.any(),async(req,res) => {
    try {
        const data = req.body
        if(req.body === undefined) {
            res.json({message:'no data foun'})
            return
        }
        let postdata = JSON.parse(req.body.postdata)
        let dirnames = req.dirnames 
        // console.log(req.dirnames,postdata);
       //{ // let toJson = (x) => {return JSON.stringify(x)}
        // let userData = `let x =${toJson(req.dirnames)}\n let y = ${req.body.postdata}\n
        //  ${toJson({ 
        //     ...postdata,
        //     projectsAmmenities:postdata.projectsAmmenities.map((e,i)=>({
        //         id:e.id,
        //         img:dirnames.amenities[i],
        //         content:e.content
        //     }))})}`
        // fs.writeFile(path.join(__dirname,'object.js'),userData,(err)=>{
        //     if(err){
        //         console.log('error');
        //         return
        //     }
        //     console.log('file created');
        // // })
        // console.log('########################################################',req.query.projectname.split(' ').join('-')+'--'+
        // req.files[0].fieldname+
        // '.'+req.files[0].originalname.split('.').pop(),'########################################################');}
        let len = req.files.length - 1
        console.log(req.files[1].fieldname,len);
        const db = await User.updateOne({ name:req.user.name},{
            "$push" : {
                "projects": {
                    ...postdata,
                    projectsAmmenities:postdata.projectsAmmenities.map((e,i)=>({
                        id:e.id,
                        img:req.query.projectname.split(' ').join('-')+'--'+
                        req.files[i].fieldname+
                        '.'+req.files[i].originalname.split('.').pop(),
                        content:e.content
                    })),
                    projectPlan:req.query.projectname.split(' ').join('-')+'--'+
                    req.files[len].fieldname+
                    '.'+req.files[len].originalname.split('.').pop()
                }
            }
        })
    res.status(200).json({message:'done'})
    } catch (error) {
        console.log(error);
    }
})

let box = Array(6).fill().map((_,index) => 
({id:index+1,head:'head',content:'content'}))
const dataFields = {
    projectName:"ProjectName",
    subTitle:"subtitle",
    box:box, //dy
    projectOverview:`project overview`,
    location:`location`,
    nearbyAttraction:{
        title:'title',
        points:[1] //dy
    }, 
    projectsAmmenities:[{id:1,img:'img',content:'content'}], //dy
    projectsPlan:'project-plan-img',
    faq:[
        {
            id:1,
        question:'question ?',
        answer:`answer`
    }
    ]

}
module.exports = router