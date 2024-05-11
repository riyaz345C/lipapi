const express = require('express');
const User = require('../DB/schema');
const router = express.Router()
const fs = require('fs');
const { dirname, join } = require('path');
const path = require('path');
const authMiddleWare = require('../middleware/authMiddleWare');
router.delete('/:id',authMiddleWare,async(req,res)=>{
    try {
        console.log(req.params.id);
    const project = await User.updateOne(
        { "name": "riyaz" }, // Match documents with the specified name
        { $pull: { "projects": { "projectName": req.params.id } } } // Remove the project with the specified projectName
      )
   
    fs.readdir(join(path.dirname(__dirname),'uploads'),'',(err,files)=>{
        if(err){
            console.log(err);
            retrun
        }
        files.forEach(e => {
            if(e.split('-')[0]===req.params.id.split(' ')[0]){
                fs.unlink(join(dirname(__dirname),'uploads',e),(err) => {
                    if(err){
                        console.log(err);
                        return
                    }
                    console.log('file deleted');
                    
                })
            }
        });
        console.log(files);
        })
    if(project.modifiedCount===0){
        res.json({message:'invalid product'})
        return
    }
    res.json({param:project,process:'success'})
} catch (error) {
    console.log(error);
}    
})
module.exports = router