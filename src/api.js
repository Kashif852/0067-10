const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

app.use(`/.netlify/functions/api`, router);

// Imagekit
const ImageKit = require('imagekit');


const imagekit = new ImageKit({
  publicKey : "public_aEaOaYimggRM+4kgwtcDb4PKl9Y=",
    privateKey : "private_D7+4Zno0EkO2fdFhMwTeX8Zwpho=",
    urlEndpoint : "https://ik.imagekit.io/ymjlyrr8zyb"
});


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  router.get('/auth', function (req, res) {
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
  });


module.exports = app;
module.exports.handler = serverless(app);
