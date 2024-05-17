const express = require('express');
const User = require('../DB/schema');
const router = express.Router()

router.get('/',async(req,res)=>{
    try {
        const products = await User.find({},{"projects.projectName":1,"_id":0})
        console.log(products);
        res.json(products)
    } catch (error) {
        console.log(error);
    }
})
// .get('/carddata',async(req,res)=>{
//     try {
//         const products = await User.find({},{"projects.projectName":1,"_id":0})
//         console.log(products);
//         res.json(products)
//     } catch (error) {
//         console.log(error);
//     }
// })
.get('/info',async(req,res)=>{
    try {
        const products = await User.find({},
        {"projects.projectName":1,"projects.projectPlan":1,
        "projects.projectOverview":1,"_id":0})
        console.log(products);
        console.log('fired');
        res.json(products)
    } catch (error) {
        console.log(error);
    }
})
.get('/:id',async(req,res)=>{
    try {
        const pname =  req.params.id.split('%20').join(' ')
        const project = await User.findOne(
            { "name": "riyaz", "projects.projectName": pname }, // Match documents with the specified name and project projectName
            { "projects.$": 1,"_id":0 } // Select only the matched project
          )
          console.log(req.params.id);
        if(project===null){
            res.json({message:'invalid product'})
            return
        }
        res.json(project.projects[0])
    } catch (error) {
        console.log(error);
    }    
})

module.exports = router