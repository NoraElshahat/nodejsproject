mongoose=require("mongoose");

// let adminSchema = new mongoose.Schema({


//     username:String,
//     password:Number

// });


let adminModelDb= new mongoose.Schema({


    id:Number,
    username:String,
    password:Number

});
mongoose.model("admin",adminModelDb);