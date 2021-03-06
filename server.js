var mongoose=require("mongoose");

const express=require("express");
var path=require("path");

var bodyParser=require("body-parser");
var cors=require("cors");
var PORT =process.env.PORT|| 8000;
var app=express();
app.use(cors());
app.use(bodyParser.json());
//=----------------------------------

app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
  }));


const db=require("./config/dbconfig");
var dbConfig=db.dburl;
mongoose.connect(dbConfig).then(()=>{
    console.log("Connected");
}).catch((err)=>{
    console.log(err);
})
if(process.env.NODE_ENV==='production')
{
    app.use(express.static(path.join(__dirname,"reacttt","build")));
    app.get("*",(req,resp)=>{
        resp.sendFile(path.join(__dirname,"reacttt","build","index.html"));
    })
}
var reactRouter=require("./routers/react-router");
app.use("/api/react",reactRouter);
var profileRouter=require("./routers/profile-router");
app.use("/api/profile",profileRouter);
var medicineRouter=require("./routers/medicine-router");
app.use("/api/medicine",medicineRouter);



  
  app.use(express.static(path.join(__dirname,"reacttt")));

  var fileUpload=require("express-fileupload");
  app.use(fileUpload());


app.listen(PORT,()=>{
    console.log("Listeningg...");
})


