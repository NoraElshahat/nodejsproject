let express= require("express");
let adminProfile=express.Router();


adminProfile.get("/profile",function(request,response){


response.send("Hi Admin");

});


module.exports=adminProfile;