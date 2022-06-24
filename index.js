const express = require("express");
const mongoose = require("mongoose");
const product = require("./routes/product");
const cors = require('cors');
require("dotenv/config");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("Connect to Database");
  }
  );
  
  app.use("/create", product);
   
  app.listen(process.env.PORT || 1000);