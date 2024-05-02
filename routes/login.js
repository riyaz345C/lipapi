const express = require('express')
const router = express.Router()
const fs = require('fs')
const bcrypt = require('bcrypt')
const path = require('path')
const user = require('../DB/schema')
const jwt = require('jsonwebtoken')
router
.get('/',(req,res)=>{
    res.sendFile(path.join(path.dirname(__dirname),'public','login.html'))
})
    .post('/',async(req,res)=>{
        try {
        const {name , password} = req.body
        console.log(name,password);
        if(!name || !password) return res.status(400).json({message:'No data'})

        // logic for user exist or not
        const data = await user.find({name:name})
        // console.log(data);
        if(!Object.keys(data).length){
            console.log('User Not Found');
            res.status(404).json({message:'User Not Found'})
            return 
        }
        console.log(data,name,password);
        // bcrypt.compare
        bcrypt.compare(password,`$2b$05$z/rqzy.7fpPNAG/gg56itOfel/4VGwwiU3x0it8P0s0yPqG5KvS2q`,(err,result) =>{
            if(err || !result){
                res.status(401).json({message:'Incorrect Password'})
                return
            }
            console.log(data[0]._id,'j');
            const token = jwt.sign({userId: data[0]._id,name:data[0].name,role:'admin'},'secret_key',{expiresIn:'1h'});
            console.log({ token });
            res.status(200).json({ token:token });
        })
        } catch (error) {
            console.log(error);
        }
    })   
    module.exports = router