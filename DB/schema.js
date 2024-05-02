const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
        name:String,
        password:String,
        projects:[{
                projectName:String,
        subTitle:String,
        box:[{
                id:Number,
                head:String,
                content:String
        }],
        projectOverview:String,
        location:String,
        nearByAttraction:{
                title:String,
                points:[{
                        id:Number,
                        point:String
                }]
        },
        projectsAmmenities:[{
                id:Number,
                img:String,
                content:String
        }],
        projectPlan:String,
        faq:[{
                id:String,
                question:String,
                answer:String
        }]
        }]
})

const User = mongoose.model('user',userSchema)
module.exports = User

let x ={
        newField:[
                {
                        img:'url',
                        name:'name',
                        address:{
                                no:'1/2',
                                street:'qwer',
                                city:'chennai'
                        }
                }
        ]
}