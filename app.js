const express = require("express");
const app = express();
// const data = require("./data.json");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');





app.set('views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));
app.use(bodyParser.json());




main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/clientsACDB');
}

app.get("/", (req, res)=> {
    res.render("home");
});




app.post("/", (req, res) => {
  var name = req.body.fullname;
  var email = req.body.email;
  var phone = req.body.number;
  var city = req.body.city;
  var message = req.body.message;
  var to = "";
    
    
  

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: to,
      pass: ""
    }
  })
  
  let mailOptions = {
    from: email,
    to: to,
    subject: "New Contact Form",
    text: "Name: " + name +
    "\nEmail: " + email +
    "\nPhone Number: " + phone +
    "\nCity: " + city +
    "\nMessage: " + message
  }; 
  console.log(name,email,phone,city,message);
  
    
  transporter.sendMail(mailOptions, (err, success) => {
    if (err){
      console.log(err);
    } else {
      console.log("Email is send");

  
    }
  });
  res.redirect('/');
  }
  
  
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
