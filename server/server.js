require("dotenv").config();

const express = require("express");
const xlsx = require('xlsx');

const app = express();

const port = process.env.PORT || 3002;

const router = require("./routers/router");

const cookieParser = require("cookie-parser");

const cors = require("cors");

// Middleware setup

// Configure CORS with specific origin and credentials
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests from the production domain or localhost for development
    const allowedOrigins = ['https://www.comforttrips.co.uk', 'http://localhost:5173'];
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request
    }
  },
  credentials: true, // Allow credentials (cookies) to be sent
}));

app.use(cookieParser());
require("./conn/conn");
app.use(express.json());

app.use("/api", router);

app.get("/",(req,res)=>{
 res.send("hello world")
})
app.listen(port,'0.0.0.0', () => {
  console.log(`App listening on port ${port}!`);
});
