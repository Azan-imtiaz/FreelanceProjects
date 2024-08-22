require("dotenv").config();
const express=require("express");
const app=new express();
const PORT=process.env.PORT || 3000;
const router=require("./routers/router");
const { configDotenv } = require("dotenv");
require("./conn/conn")

app.use("/api",router);



app.listen(PORT, () => {
    console.log('App listening on port 3000!');
});

