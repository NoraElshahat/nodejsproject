const express=require("express");
let path = require("path");

//require("../models/adminModel");
let authenticationRouter=express.Router();
//let adminModel= mongoose.model("admin");


authenticationRouter.get("/login",function(request,response){

    request.session.role="admin";
    response.render("form.ejs");


 });

authenticationRouter.post("/login",function(request,response){



if(request.body.userName=="admin" &&request.body.password=="123")
{
    
     response.redirect("/speakers/list");
   
}

else
{
    response.redirect("/speakers/profile");
}

});

authenticationRouter.get("/logout",function(request,response){

    response.redirect("/auth/login");
});

module.exports=authenticationRouter;