const mongoose = require("mongoose");
require("../model/jobschema");
require('../model/jobsorder')
const Jobsorder = mongoose.model('jobsorders');
const Jobs = mongoose.model("jobs");

module.exports = async(app) => { 

    app.post('/jobs/createnew', async (req, res) => {
        const newjob = req.body;
        const newJob = new Jobs({
            title: newjob.title,
            email: newjob.email,
            description: newjob.description,
            location: newjob.location,
            deadline: new Date(newjob.deadline),
            phonenumber: newjob.phonenumber,
            applicants: []
            
        });

        const response = await newJob.save();

        const newjobid = response._id;

        await Jobsorder.updateOne(
            {key:'7984dsfdsf'}, 
            { $push: { listorder: newjobid } }
        );
        res.send(response);
    });

    app.get('/jobs/alljobs', async (req, res) => {
        const response = await Jobs.find({});
        const dict = {}
        response.map(item => {
            dict[item._id]=item
        })
        console.log(dict);

//         await Jobsorder.updateOne( {key:'7984dsfdsf'}, {
//         $pullAll: { listorder: newjobid }
// });


        res.send(dict);
    });

    app.get('/jobs/getorder', async (req, res) => {
          const response = await Jobsorder.find({});
        res.send(response[0]['listorder']);
    })
}