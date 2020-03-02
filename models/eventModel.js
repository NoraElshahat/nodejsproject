require("mongoose");

let eventSchema= new mongoose.Schema({

    _id:Number,
    title:String,
    mainSpeaker:{type:Number,ref:"speaker"},
    otherSpeaker:[{type:Number,ref:"speaker"}],
    eventDate:Date

});

mongoose.model("events",eventSchema);