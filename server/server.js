require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const router = require("./routers/router");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Middleware setup

// Configure CORS with specific origin and credentials
app.use(cors({
  // origin: 'http://localhost:5173', // Replace this with your React app's actual URL
  origin:'https://comingsoon.comforttrips.co.uk/',
  credentials: true, // Allow credentials (cookies) to be sent
}));

app.use(cookieParser());
require("./conn/conn");
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
