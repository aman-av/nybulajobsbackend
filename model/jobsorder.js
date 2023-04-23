const mongoose = require("mongoose");
const {Schema} =  mongoose;

const jobsorders = new Schema({
    listorder:{
        type:Array
    },
    key: {
        type:String
    }
   
});

mongoose.model('jobsorders',jobsorders);