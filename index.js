const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const { json } = require('body-parser')
const DbConnect = require('./DB/dbconnect')

DbConnect()
app.use(cors({
    
}))
app.use(json())
app.use(express.static(path.join(__dirname,'uploads')))

// app.use('/')
app.use('/login',require('./routes/login'))
app.use('/protected',require('./routes/protected'))
app.use('/delete',require('./routes/deleteProduct'))
app.use('/update',require('./routes/update'))
app.use('/projects',require('./routes/projectsGet'))
app.use('/sendEmail',require('./routes/mailSender'))
app.listen(4000,()=>{
    console.log('kkkkkkkkkkkkkkkkkkk');
})
