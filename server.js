//jshint esversion: 6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https= require("https");

app.use(express.static("public"));
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
    var firstname = req.body.fname;
    var lastname = req.body.lname;
    var email = req.body.email;

   var data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname
            }
        }
    ]
   };
   var jsonData = JSON.stringify(data);
   const url = "https://us21.api.mailchimp.com/3.0/lists/4255cc1ce9";
   const options ={
    method: "POST",
    auth:"sky:047dd35451494532b2b04e5f2391e255-us21"
   }
 const request = https.request(url,options,function(response){
    if(response.statusCode ===200){
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname+"/fail.html");
    }
    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
})
request.write(jsonData);
request.end();
});


app.listen(process.env.PORT||3000,function(){
    console.log("sever is running at port 3000");
});
//047dd35451494532b2b04e5f2391e255-us21
// 4255cc1ce9



