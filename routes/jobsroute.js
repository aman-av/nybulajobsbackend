const mongoose = require("mongoose");
require("../model/jobschema");
const Jobs = mongoose.model("jobs");

module.exports = async(app) => { 

    app.post('/jobs/createnew', async(req, res) => {
        const newjob = req.body;
         const newJob = new Jobs({
             title: newjob.title,
             email: newjob.email,
             description: newjob.description,
             location: newjob.location,
             deadline: new Date(newjob.deadline),
             phonenumber: newjob.phonenumber,
             applicants:[]
            
      });


        const response = await newJob.save();
        res.send(response);
    })
}