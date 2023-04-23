# nybulajobsbackend

server link - https://nybulajobsbackend.cyclic.app

# Database 

I am using mongoDB sql database for saving and retriving the data,
since i can use the benefit of writing complex query in this as well as i will get the acid nature with this db

# Different Schema

User schema for keeping user detail   

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

    i am not using any external tool to handle authentication instead i am doing it manually and storing the sync hash of the password for security purpose.


Job Schema for keeping job data and the applicants

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

So whenever any applicant apply for some job it will add the id of that user to the applicant array so that it will be helpful when terraformers wants to know who all have applied for the job for that operation it will do it in O(N) time.

After job is expired it will shift to different collection with the name archivedjobs, so that the applicant can only view the open jobs

# Routes

authroutes.js has all the routes for authentication process which includes login,logout,signup
/login , /logout ,/signup

jobroutes.js has all the routes for job related apis
/jobs/createnew 
/jobs/getall
/jobs/applicants