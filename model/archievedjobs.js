const mongoose = require("mongoose");
const {Schema} =  mongoose;

const archievedjobs = new Schema({
    title:{
        type:String
    },
    email: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    deadline: {
        type:Date
    },
    phonenumber:{
        type:String
    },
    applicants: {
        type:Array
    }
});

mongoose.model('archievedjobs',archievedjobs);