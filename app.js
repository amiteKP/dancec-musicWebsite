const express=require("express");
const path=require("path");
const fs=require("fs");
const app=express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port=8000;

// defining mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    query: String
  });
  var Contact = mongoose.model('Contact', contactSchema);


app.use('/static',express.static('static'));
app.use(express.urlencoded())

//set the template engine as pug
app.set('view engine', 'pug')

// set the views directory
app.set('views',path.join(__dirname,'views'))

//pug endpoint
app.get("/", (req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params);
})
app.get("/contact", (req,res)=>{
    const params={ }
    res.status(200).render('contact.pug',params);
})

app.post("/contact", (req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to database")
    }).catch(()=>{
        res.status(400).send("item was not saved to database")
    });
    //  res.status(200).render('contact.pug');
})

app.listen(port,()=>{
    console.log(`app  started successfully on port ${port}`);
});