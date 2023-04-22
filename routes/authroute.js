const mongoose = require("mongoose");
require("../model/userschema");
const User = mongoose.model("users");
const bcrypt = require('bcryptjs');
module.exports = (app) => {

app.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

app.post('/login', async (req, res) => {
    const email=req.body.email
  const password = req.body.password
  let hashedPassword = await bcrypt.hashSync(password, 10);
   const user = await User.findOne({
     email: email
   });
  
  let auth =await bcrypt.compareSync(req.body.password, user["password"]);
    if(auth) {
        var redir = { redirect: "/" , message:"login successfull" , user:user };	
        return res.json(redir);
  }
  else return res.status(401).send({'error':'email or password incorrect'})
  
})

app.delete('/logout', function(req, res){
	req.session.destroy();
	return res.status(200).json({message: 'LOGOUT_SUCCESS'});
  });
  
app.post('/signup', async(req, res)=>{
  
  const name = req.body.name
  const email=req.body.email
  const password=req.body.password
  const type = req.body.type
  const user = await User.findOne({
    email: email
  });       

    if(user && (user.email!=undefined)) {
        var redir = { redirect: "/" , message:"id already exists" , email:user.email };	
        return res.json(redir);
    }
    else {
         let hashedPassword = await bcrypt.hashSync(password, 10);
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const newUser = new User({
          email: req.body.email,
          password: hashedPassword,
            type:type,
            name:name
            
      });


      const response = await newUser.save();
      console.log('response', response);
      
     const sessionuser = {
          email: req.body.email,
          id:response._id,
            type:type,
            name:name
            
      }
      req.session.user = sessionuser;

      var redir = { redirect: "/", message:"New user Created", user: newUser};
      return res.json(redir);
    }
});
}