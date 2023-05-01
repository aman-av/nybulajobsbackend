const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
require("../model/jobschema");
require('../model/archievedjobs');
require('../model/jobsorder');
require('../model/userschema');
const User = mongoose.model('users');
const Archivedjobs = mongoose.model('archievedjobs')
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
            { $addToSet: { listorder: newjobid } }
        );
        res.send(response);
    });

    app.get('/jobs/alljobs', async (req, res) => {
        const response = await Jobs.find({});
//         For simplicity, the listing which
// are due in more than 21 days should be green, less than 14
// days should be yellow and less than 3 days should be red
        const curdate = new Date()
        var dict = {}
        response.map(item => {
            dict[item._id] = {...item['_doc']};
            let diff = new Date(item.deadline) - curdate;
            var diffDays = parseInt((diff) / (1000 * 60 * 60 * 24), 10);
            if (diffDays > 21)
                dict[item._id].color = 'lightgreen';
            else if (diffDays > 14)
                dict[item._id].color = 'yellow';
            else if (diffDays >=3)
                dict[item._id].color = 'orange';
            else if (diffDays < 3 && diffDays >= 0)
                dict[item._id].color = 'red';
            else if (diffDays < 0) {
                const func = async () => {
                    delete dict[item._id];
                    const resp = await Jobs.findOneAndDelete({ _id: new ObjectId(item._id) });

                    const user = new Archivedjobs(resp);

                    await user.save();

                }
                func();
            }
                console.log(dict)
        });
        console.log(dict);
        console.log(dict);

//         await Jobsorder.updateOne( {key:'7984dsfdsf'}, {
//         $pullAll: { listorder: newjobid }
// });


        res.send(dict);
    });

    app.get('/jobs/getorder', async (req, res) => {
        const response = await Jobsorder.find({});
        res.send(response[0]['listorder']);
    });

    app.post('/jobs/updateorder', async (req, res) => {
        // const response = await Jobsorder.find({});

        const response = await Jobsorder.updateOne({ key: '7984dsfdsf' },
            {
                $set: { "listorder": req.body }
            })
        res.send(response);
    });

    app.post('/jobs/jobsapplied', async (req, res) => {
        console.log(new ObjectId(req.body.jobid))
        const res1 = await Jobs.findOneAndUpdate({ _id:new ObjectId(req.body.jobid) },
            { $push: { applicants: req.body.userid } }
        )
        console.log(res1);
        console.log(new ObjectId(req.body.userid))

        const res2 = await User.findOneAndUpdate({ _id: new ObjectId(req.body.userid) },
            { $push: { appliedjobs: req.body.jobid } });
        console.log(res2);
        res.send('ok')

    });

    app.post('/jobs/getjobsapplied', async (req, res) => {
        const resp = await User.findOne({ _id:new ObjectId(req.body.userid) });
        res.send(resp.appliedjobs);

    });
}