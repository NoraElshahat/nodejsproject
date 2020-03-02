const express=require("express");
let speakerRouters=express.Router();
let mongoose=require("mongoose");
require("../models/speakerModels");
let speakerModel=mongoose.model("speaker");


speakerRouters.get("/list",function(request,response){

    speakerModel.find({})
        .then((speakerdata)=>{
            
         response.render("stylespeaker",{speakerdata:speakerdata});
        
        }).catch((error)=>{console.log(error+" ")});
    
});


speakerRouters.get("/profile",function(request,response){

    response.render("speakerprofile");

});



speakerRouters.get("/add",function(request,response){

    response.render("addSpeaker");
    
});

speakerRouters.post("/login",function(request,response){
   
    
    speakerModel.find({userName:request.body.username , password:request.body.password}).then((sdata)=>{
       console.log(sdata);
        response.render("profilespeaker",{speakerdata:sdata[0]});

    }).catch((err)=>{
        console.log(err+"");
    });



speakerRouters.post("/add",function(request,response){

    console.log(request.body); 
    let newSpeaker= new speakerModel(

         request.body
   
    );
    newSpeaker.save().then((data)=>{
        console.log(data);
        response.redirect("/speakers/list");
    }).catch((error)=>{


        console.log(error+"");
    });

});

speakerRouters.get("/update/:id",function(request,response){
    speakerModel.find({_id:request.params.id}).then((data)=>{

        console.log(data);
       response.render("editform",{data:data[0]});

    }).catch((error)=>{

        console.log(error);
    })
   
});

speakerRouters.post("/update",function(request,response){
   
        speakerModel.updateOne({_id:request.body._id},{$set:request.body})
        .then((data)=>{
            console.log(data);
            response.redirect("/speakers/list");
        })
        .catch((error)=>{console.log(error+" ")});
        

    });
speakerRouters.get("/delete/:id",function(request,response){

   
    speakerModel.deleteOne({_id:request.params.id})
    .then((data)=>{
        response.send("done");
     console.log(data);
    })
    .catch((error)=>{console.log(error+" ")});


});

});


module.exports=speakerRouters;