const mongoose = require("mongoose");
module.exports = (router) => {

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

router.post("/send", (req, res) => {
    console.log('req.body',req.body)
    res.send({
        'sentdata': 'yes'
    });
});

router.post("/send2", (req, res) => {
    console.log('req.body',req.body)
    res.send({
        'sentdata': 'yes'
    });
});
}