const mongoose = require("mongoose");
const {Schema} =  mongoose;

const jobs = new Schema({
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
    }
});

mongoose.model('jobs',jobs);