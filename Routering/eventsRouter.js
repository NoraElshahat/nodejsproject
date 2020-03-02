let express = require("express");
let eventRouter=express.Router();
require("../models/eventModel");
let eventModel=mongoose.model("events");


eventRouter.get("/list",function(request,response){


    eventModel.find({}).then((data)=>{

        response.send(data);
    }).catch((error)=>{

        console.log(error+"");

    });


});

eventRouter.get("/add",function(request,response){

    // response.render("addEvent");

    

});


eventRouter.post("/add",function(request,response){

    // response.send("/event/add");

    let newEvent= new eventModel({

        _id:request.body._id,
        title:request.body.title,
        mainSpeaker:request.body.mainSpeaker,
        otherSpeaker:request.body.otherSpeaker,
        eventDate:request.body.eventDate

    });
    newEvent.save().then((data)=>{
        response.send(data);
    }).catch((error)=>{

        console.log(error+"");
    });
    

});



eventRouter.get("/update",function(request,response){

    // response.send("/event/update");

});

eventRouter.get("/delete",function(request,response){

    // response.send("/event/delete");

});

module.exports=eventRouter;