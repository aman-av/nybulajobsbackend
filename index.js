const express = require("express");
// const serverless = require("serverless-http");
// var cookieParser = require('cookie-parser');
// var session = require('express-session');
const bodyParser = require("body-parser");
// const keys = require('../config/keys');
// const mongoose = require('mongoose');

const app = express();
// app.use(cookieParser());

// mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// .then(result => {
//     console.log("Mongoose Is Connected");
//     server.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));
// })
// .catch(err => console.log(err));
// app.use(
//     session({
 
//         // It holds the secret key for session
//         secret: keys.cookieKey,
 
//         // Forces the session to be saved
//         // back to the session store
//         resave: true,
 
//         // Forces a session that is "uninitialized"
//         // to be saved to the store
//         saveUninitialized: false,
//         cookie: {
 
//             // Session expires after 7days of inactivity.
//             expires: 7*24*60*60*1000
//         }
//     })
// );
app.use(bodyParser.json());


app.get('/',(req, res) => {
   res.json({
    hello: "hi!"
  });
})

// require('../routes/authroute')(router);

// app.use(`/.netlify/functions/api`, router);

let port = process.env.PORT || 8000
			app.listen(port);


// module.exports = app;
// const handler = serverless(app);
// module.exports.handler = async (event, context) => {
//   const result = await handler(event, context);
//   return result;
// };