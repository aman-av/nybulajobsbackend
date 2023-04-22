const mongoose = require("mongoose");
const {Schema} =  mongoose;

const users = new Schema({
    name:{
        type:String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    type:{
        type:String
    }
});

mongoose.model('users',users);