const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth")
const conversationRoute = require("./routes/conversations")
const UserRoute = require("./routes/users")
const { ErrorHandler } = require('./errorHandler');
const cors = require('cors');
var bodyParser = require("body-parser");
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.json())
const db = process.env.NODE_ENV == 'test' 
? process.env.DATABASE_URL_TEST 
: process.env.DATABASE_URL

mongoose.connect(db)
.then(()=>{console.log("mongodb: Connection to database successful!")})
.catch((err)=>{
    console.log("mongodb: Failed to connect to database")
    console.log(err)
})

app.use("/api/auth", authRoute)
app.use("/api/conversations", conversationRoute)
app.use("/api/users", UserRoute)

app.use(ErrorHandler)

app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`Server running on port: ${process.env.SERVER_PORT}`)
    console.log(`Server Instance: ${process.env.NODE_ENV}`)
})