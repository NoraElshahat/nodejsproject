let express = require("express");
let eventRouter = express.Router();
require("../models/eventModel");
require("../models/speakerModels");
let speakerEventModel = mongoose.model("speaker");
let eventModel = mongoose.model("events");

var dataEvent;




eventRouter.get("/list", function (request, response) {



    eventModel.find({}).populate({ path: "mainSpeaker otherSpeaker" })

        .then((eventData) => {
            console.log(eventData);
            response.render("styleEvents", { eventData: eventData })
        }).catch((error) => {

            console.log(error + "");

        });


});

eventRouter.get("/add", function (request, response) {


    speakerEventModel.find({}).then((data) => {

        console.log(data);
        response.render("addeventadd", { speakerd: data });
    }).catch((err) => {

        console.log(err + "");
    });

});


eventRouter.post("/add", function (request, response) {

    // response.send("/event/add");

    let newEvent = new eventModel(
        request.body

    );
    newEvent.save().then((data) => {
        console.log(data);
        response.redirect("/events/list");
    }).catch((error) => {

        console.log(error + "");
    });


});

eventRouter.get("/update/:id", function (request, response) {

    eventModel.find({ _id: request.params.id }).populate({ path: "mainSpeaker otherSpeaker" })
        .then((eventdata) => {

             console.log(eventdata);
            speakerEventModel.find().then((data1) => {
                console.log(data1)
                response.render("addEvent", { data: eventdata, speaker: data1 })
            }).catch((error) => {
                console.log(error);

            })




        }).catch((error) => {
            console.log(error + "");
        });



});

eventRouter.post("/update", function (request, response) {

    console.log(request.body);
    eventModel.updateOne({ _id: request.body._id }, { $set:request.body})
        .then((data) => {

            console.log(data);
            response.redirect("/events/list");
        })
        .catch((error) => { console.log(error + " ") });



});

eventRouter.get("/delete/:id", function (request, response) {

    eventModel.deleteOne({ _id: request.params.id }).then((data) => {
        console.log(data);
        response.send(data);
    }).catch((error) => {

        console.log(error);
    })



});


module.exports = eventRouter;