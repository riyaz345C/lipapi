const mongoose = require('mongoose')
// mongodb+srv://lip:<password>@cluster0.nddlqjy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb://localhost:27017/LIPDB
// mongodb+srv://lip:<password>@cluster0.nddlqjy.mongodb.net/
const DbConnect = async () =>{
    try {
       await mongoose.connect(
// 'mongodb+srv://lip-admin:CKSbwVYiavoM8siv@lands-india-property.7uqip9u.mongodb.net/?retryWrites=true&w=majority&appName=lands-india-property'
'mongodb://lip-admin:CKSbwVYiavoM8siv@ac-vbbgtd9-shard-00-00.7uqip9u.mongodb.net:27017,ac-vbbgtd9-shard-00-01.7uqip9u.mongodb.net:27017,ac-vbbgtd9-shard-00-02.7uqip9u.mongodb.net:27017/?ssl=true&replicaSet=atlas-aqadra-shard-0&authSource=admin&retryWrites=true&w=majority&appName=lands-india-property'
);
// mongodb+srv://lip-admin:CKSbwVYiavoM8siv@lands-india-property.7uqip9u.mongodb.net/?retryWrites=true&w=majority&appName=lands-india-property
    // if (connectionStatus) {
    //     console.log('Connected to MongoDB');
    // } else {
    //     console.log('Failed to connect to MongoDB');
    // }
    console.log('connected');
    } catch (error) {
        console.log('p',error);
    }
}
module.exports= DbConnect