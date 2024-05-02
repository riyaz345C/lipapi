const bcrypt = require('bcrypt')
const encrypt = (password)=>{
    bcrypt.genSalt(5,(err,salt)=>{
        bcrypt.hash(password,salt,(err,hash)=>{
            if(err) {
                // console.error(err);
                return err
            }
            console.log(hash);
            return hash
        })
    })
}

console.log(encrypt('lip123'));