let express=require("express");
let path=require("path");
let server = express();
const mongoose=require("mongoose");
 const expressSsesion = require("express-session");




let authenticateRouter=require("./Routering/authRouter");
let speakersRouter=require("./Routering/speakerRouter.js");
let eventRouters=require("./Routering/eventRouter");
let adminProfile=require("./Routering/adminProfile");

server.listen(8082,function(){

console.log("i am listining")

});

mongoose.connect("mongodb://localhost:27017/DatabaseLab")
    .then(()=>{

        console.log("DB Connected...")
    }).catch((error)=>{

        console.log(error+" ");
    });

   

server.use(function(request,response,next){

console.log("First Middle Ware",request.method, ": " , request.url);
next();

});

server.use(express.urlencoded({extended:false}));
server.set("view engine","ejs");
 server.use(expressSsesion({secret:"admin", maxAge:20}));
server.set(path.join(__dirname,"views"));
server.use(express.static(path.join(__dirname , "public")));
server.use(express.static(path.join(__dirname , "node_modules")));

server.use("/auth",authenticateRouter);
server.use((request,response,next)=>{
    
    if(request.session.role)
    {
        response.locals.name=request.session.name;
        
       next();
    }
    else
    {
        response.redirect("/auth/login");
        //console.log("elseeee");
    }

});


server.use("/speakers",speakersRouter);
server.use("/events",eventRouters);
server.use("/admin",adminProfile);

server.use(function(request,response){

console.log("default Middel Ware");
 next();
});


