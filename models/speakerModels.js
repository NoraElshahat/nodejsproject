mongoose=require("mongoose");

speakerSchema=new mongoose.Schema({

    _id:Number,
    fullname:String,
    username:String,
    password:Number,
    age:Number,
    address:{

        city:String,
        street:Number,
        building:Number
    }


});
//mapping

mongoose.model("speaker",speakerSchema);


