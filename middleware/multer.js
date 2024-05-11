const multer = require('multer')
const path =  require('path')
const fs = require('fs')
// Define storage for uploaded files
// let imgFiles = [] 
// let newName;
// let d = 0;
async function createFolder(folderPath){
    try {
        await fs.promises.mkdir(folderPath)
        console.log('folder created');
    } catch (error) {
        console.log(error);
    }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log({uploadsExist:fs.existsSync(path.join(path.dirname(__dirname),'uploads'))}
        ,req.query.projectname.split(' ').join('-'),file,'popop');

        if(!fs.existsSync(path.join(path.dirname(__dirname),'uploads'))){

            createFolder(path.join(path.dirname(__dirname),'uploads'))
            
        }
        cb(null, path.join(path.dirname(__dirname),'uploads')) // Save files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
    //    let newName = req.query.projectname.split(' ').join('-')+"--"+file.fieldname+'.'+file.originalname.split('.').pop();
        // pop function for extract file extension
        // if(imgFiles.length === 0){
        //     imgFiles = { 
        //         projetPlan:null,
        //         amenities:null
        //     }
        //     console.log('array initialized');
        // }
        
        // if(file.fieldname === 'projectplan'){
        //     imgFiles.projetPlan = newName;
        //     console.log(newName,d++);
        // } else{
        //     if(!imgFiles.amenities){
        //         imgFiles.amenities = []
        //         console.log('amm array init');
        //         console.log(newName,d++);
        //     }
        //     imgFiles.amenities.push(newName);
        //     console.log(newName,d++);
        // }
        // req.dirnames = imgFiles
        cb(null, req.query.projectname.split(' ').join('-')+"--"+file.fieldname+'.'+file.originalname.split('.').pop()) // Use the original filename
    }
});

// Create multer instance with defined storage
const upload = multer({ storage: storage });
module.exports = {upload}