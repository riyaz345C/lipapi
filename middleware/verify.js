const bcrypt = require('bcrypt')

const verify = (hash,password)=>{
    bcrypt.compare(password,hash,(err,result)=>{
        if(err){
            return err
        }
        if(result){
            return 'correct'
        }
        return 'incorrect'
    })
}