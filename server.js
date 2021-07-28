require("dotenv").config();
bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const google = require("./routes/google");
const app = express();


// Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());


app.get('/',(req,res)=>{
  res.send("Welcome User");
});

app.use("/", google);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
