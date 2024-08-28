require("dotenv").config();
const express = require("express");
const app = new express();
const PORT = process.env.PORT ||3000;
const router = require("./routers/router");
// const cookieParser = require("cookie-parser"); // Correct import of cookie-parser
const cors = require("cors");

// Middleware setup
app.use(cors());



// app.use(cookieParser()); 
require("./conn/conn");
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
